import { getRoles } from '../services/role.service';
import { getCounterparties } from '../services/counterparty.service';

let rolesCache = null;
let counterpartiesCache = null;

let rolesPromise = null;
let counterpartiesPromise = null;

export const getRolesCached = async () => {
  if (rolesCache) return rolesCache;

  if (!rolesPromise) {
    rolesPromise = getRoles().then(res => {
      rolesCache = res.data.items;
      rolesPromise = null;
      return rolesCache;
    });
  }

  return rolesPromise;
};

export const getCounterpartiesCached = async () => {
  if (counterpartiesCache) return counterpartiesCache;

  if (!counterpartiesPromise) {
    counterpartiesPromise = getCounterparties().then(res => {
      counterpartiesCache = res.data.items;
      counterpartiesPromise = null;
      return counterpartiesCache;
    });
  }

  return counterpartiesPromise;
};