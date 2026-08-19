export const orderMapper = {
  fromApi: (data) => {
    if (!data) return {};

    return {
      counterpartyId: data.counterpartyId,
      hubId: data.hubId,

      // status: data.status,
      // source: data.source,
      // isRegular: data.isRegular,

      // plannedWeekStart: data.plannedWeekStart,
      // deadlineAt: data.deadlineAt,
      // plannedShipDate: data.plannedShipDate,

      // submittedAt: data.submittedAt,
      // acceptedAt: data.acceptedAt,
      // shippedAt: data.shippedAt,
      // completedAt: data.completedAt,

      // isBlockedAtCreation: data.isBlockedAtCreation,
      // comment: data.comment,
    };
  },

  toApi: (form) => {
    return {
      counterpartyId: form.counterpartyId,
      hubId: form.hubId,

      // status: form.status,
      // source: form.source,
      // isRegular: form.isRegular,

      // plannedWeekStart: form.plannedWeekStart,
      // deadlineAt: form.deadlineAt,
      // plannedShipDate: form.plannedShipDate,

      // submittedAt: form.submittedAt,
      // acceptedAt: form.acceptedAt,
      // shippedAt: form.shippedAt,
      // completedAt: form.completedAt,

      // isBlockedAtCreation: form.isBlockedAtCreation,
      // comment: form.comment,
    };
  },
};