import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import Redis from 'ioredis';

// Initialize Redis client (optional - falls back to memory store if not available)
let redisClient = null;
try {
  if (process.env.REDIS_URL) {
    redisClient = new Redis(process.env.REDIS_URL, {
      retryDelayOnFailover: 100,
      maxRetriesPerRequest: 3,
      lazyConnect: true,
    });
    
    redisClient.on('error', (err) => {
      console.warn('Redis connection error, falling back to memory store:', err.message);
      redisClient = null;
    });
  }
} catch (error) {
  console.warn('Redis initialization failed, using memory store:', error.message);
  redisClient = null;
}

// Helper function to create rate limiter with Redis store if available
const createLimiter = (config) => {
  const limiterConfig = {
    ...config,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
      res.status(429).json({
        success: false,
        message: 'Too many requests',
        error: `Rate limit exceeded. Try again in ${Math.ceil(config.windowMs / 1000)} seconds.`,
        retryAfter: Math.ceil(config.windowMs / 1000)
      });
    },
  };

  // Use Redis store if available, otherwise use default memory store
  if (redisClient) {
    limiterConfig.store = new RedisStore({
      sendCommand: (...args) => redisClient.call(...args),
    });
  }

  return rateLimit(limiterConfig);
};

// General API rate limiter - 1000 requests per 15 minutes
export const apiLimiter = createLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 1000 requests per windowMs
  message: 'Too many API requests from this IP, please try again later.',
  skip: (req) => {
    // Skip rate limiting for certain IP addresses (e.g., internal services)
    const skipIPs = process.env.RATE_LIMIT_SKIP_IPS?.split(',') || [];
    return skipIPs.includes(req.ip);
  }
});

// Strict rate limiter for authentication endpoints - 5 requests per 15 minutes
export const authLimiter = createLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many authentication attempts from this IP, please try again later.',
  skipSuccessfulRequests: true, // Don't count successful requests
});

// Password reset rate limiter - 3 requests per hour
export const passwordResetLimiter = createLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // limit each IP to 3 password reset requests per hour
  message: 'Too many password reset attempts from this IP, please try again later.',
});

// Email verification rate limiter - 5 requests per hour
export const emailVerificationLimiter = createLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // limit each IP to 5 email verification requests per hour
  message: 'Too many email verification attempts from this IP, please try again later.',
});

// Property creation rate limiter - 10 requests per hour for authenticated users
export const propertyCreationLimiter = createLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // limit each IP to 10 property creations per hour
  message: 'Too many property creation attempts from this IP, please try again later.',
  keyGenerator: (req) => {
    // Use user ID if authenticated, otherwise use IP
    return req.user ? `property_creation_${req.user.id}` : `property_creation_ip_${req.ip}`;
  }
});

// Search rate limiter - 200 requests per 15 minutes
export const searchLimiter = createLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // limit each IP to 200 search requests per windowMs
  message: 'Too many search requests from this IP, please try again later.',
});

// Upload rate limiter - 20 uploads per hour
export const uploadLimiter = createLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20, // limit each IP to 20 uploads per hour
  message: 'Too many upload attempts from this IP, please try again later.',
  keyGenerator: (req) => {
    // Use user ID if authenticated, otherwise use IP
    return req.user ? `upload_${req.user.id}` : `upload_ip_${req.ip}`;
  }
});

// Contact form rate limiter - 3 requests per hour
export const contactLimiter = createLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // limit each IP to 3 contact form submissions per hour
  message: 'Too many contact form submissions from this IP, please try again later.',
});

// Review/Rating rate limiter - 5 requests per hour for authenticated users
export const reviewLimiter = createLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // limit each user to 5 reviews per hour
  message: 'Too many review submissions, please try again later.',
  keyGenerator: (req) => {
    // Use user ID for authenticated requests
    return req.user ? `review_${req.user.id}` : `review_ip_${req.ip}`;
  }
});

// Report rate limiter - 10 reports per hour for authenticated users
export const reportLimiter = createLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // limit each user to 10 reports per hour
  message: 'Too many report submissions, please try again later.',
  keyGenerator: (req) => {
    return req.user ? `report_${req.user.id}` : `report_ip_${req.ip}`;
  }
});

// Chat message rate limiter - 100 messages per hour for authenticated users
export const chatLimiter = createLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 100, // limit each user to 100 messages per hour
  message: 'Too many messages sent, please try again later.',
  keyGenerator: (req) => {
    return req.user ? `chat_${req.user.id}` : `chat_ip_${req.ip}`;
  }
});

// Payment rate limiter - 5 payment attempts per hour
export const paymentLimiter = createLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // limit each user to 5 payment attempts per hour
  message: 'Too many payment attempts, please try again later.',
  keyGenerator: (req) => {
    return req.user ? `payment_${req.user.id}` : `payment_ip_${req.ip}`;
  }
});

// Admin rate limiter - more lenient for admin operations
export const adminLimiter = createLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // limit each admin to 500 requests per windowMs
  message: 'Too many admin requests, please try again later.',
  keyGenerator: (req) => {
    return req.user ? `admin_${req.user.id}` : `admin_ip_${req.ip}`;
  }
});

// Dynamic rate limiter based on user membership tier
export const createDynamicLimiter = (baseConfig) => {
  return (req, res, next) => {
    let multiplier = 1;
    
    if (req.user) {
      switch (req.user.membershipTier) {
        case 'basic':
          multiplier = 1.5;
          break;
        case 'premium':
          multiplier = 2;
          break;
        case 'pro':
          multiplier = 3;
          break;
        case 'admin':
          multiplier = 5;
          break;
        default:
          multiplier = 1; // free tier
      }
    }

    const dynamicLimiter = createLimiter({
      ...baseConfig,
      max: Math.floor(baseConfig.max * multiplier),
      keyGenerator: (req) => {
        const tier = req.user?.membershipTier || 'free';
        return req.user ? `${baseConfig.prefix}_${tier}_${req.user.id}` : `${baseConfig.prefix}_ip_${req.ip}`;
      }
    });

    dynamicLimiter(req, res, next);
  };
};

// Usage example for dynamic limiter
export const dynamicApiLimiter = createDynamicLimiter({
  windowMs: 15 * 60 * 1000,
  max: 100, // base limit for free tier
  prefix: 'api'
});

export const dynamicSearchLimiter = createDynamicLimiter({
  windowMs: 15 * 60 * 1000,
  max: 50, // base limit for free tier
  prefix: 'search'
});

// Utility function to reset rate limit for a specific key (useful for admin override)
export const resetRateLimit = async (key) => {
  if (redisClient) {
    try {
      await redisClient.del(key);
      return true;
    } catch (error) {
      console.error('Error resetting rate limit:', error);
      return false;
    }
  }
  return false; // Cannot reset memory store limits
};

// Utility function to get current rate limit info for a key
export const getRateLimitInfo = async (key) => {
  if (redisClient) {
    try {
      const current = await redisClient.get(key);
      const ttl = await redisClient.ttl(key);
      return {
        current: current ? parseInt(current) : 0,
        ttl: ttl > 0 ? ttl : 0
      };
    } catch (error) {
      console.error('Error getting rate limit info:', error);
      return null;
    }
  }
  return null; // Cannot get info from memory store
};

// Middleware to add rate limit info to response headers
export const addRateLimitHeaders = (req, res, next) => {
  const originalSend = res.send;
  
  res.send = function(data) {
    // Add custom rate limit headers if available
    if (req.rateLimit) {
      res.setHeader('X-RateLimit-Limit', req.rateLimit.limit);
      res.setHeader('X-RateLimit-Remaining', req.rateLimit.remaining);
      res.setHeader('X-RateLimit-Reset', new Date(Date.now() + req.rateLimit.resetTime));
    }
    
    originalSend.call(this, data);
  };
  
  next();
};

export default {
  apiLimiter,
  authLimiter,
  passwordResetLimiter,
  emailVerificationLimiter,
  propertyCreationLimiter,
  searchLimiter,
  uploadLimiter,
  contactLimiter,
  reviewLimiter,
  reportLimiter,
  chatLimiter,
  paymentLimiter,
  adminLimiter,
  dynamicApiLimiter,
  dynamicSearchLimiter,
  resetRateLimit,
  getRateLimitInfo,
  addRateLimitHeaders
};