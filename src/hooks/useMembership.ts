
import { useApi, useMutation } from './useApi';
import { membershipService, MembershipPlan, UserMembership } from '../services/membershipService';

export function useMembershipPlans() {
  return useApi<MembershipPlan[]>(
    membershipService.getPlans,
    { immediate: true }
  );
}

export function useUserMembership(userId?: string) {
  return useApi<UserMembership>(
    () => membershipService.getUserMembership(userId || ''),
    { immediate: !!userId }
  );
}

export function useSubscribeMembership() {
  return useMutation<UserMembership>(membershipService.subscribe);
}
