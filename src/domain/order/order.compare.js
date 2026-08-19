export const normalizeOrder = (obj) => {

  return {
    counterpartyId: obj.counterpartyId,
    hubId: obj.hubId,

    // status: obj.status,
    // source: obj.source,
    // isRegular: obj.isRegular,

    // plannedWeekStart: obj.plannedWeekStart,
    // deadlineAt: obj.deadlineAt,
    // plannedShipDate: obj.plannedShipDate,

    // submittedAt: obj.submittedAt,
    // acceptedAt: obj.acceptedAt,
    // shippedAt: obj.shippedAt,
    // completedAt: obj.completedAt,

    // isBlockedAtCreation: obj.isBlockedAtCreation,
    // comment: obj.comment,
  }
};