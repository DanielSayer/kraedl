import { addMonths } from "date-fns";
import dashboardRepository from "../../repositories/dashboardRespository";

export const getBusinsessGrossIncome = async (businessId: string) => {
  const today = new Date();
  const lastMonth = addMonths(today, -1);
  const twoMonthsAgo = addMonths(lastMonth, -1);

  const thisMonthsTotals = await dashboardRepository.getInvoiceTotalsInRange(
    lastMonth,
    today,
    businessId,
  );
  const thisMonthsTotal = thisMonthsTotals.reduce(
    (c, curr) => c + parseFloat(curr.total),
    0,
  );

  const lastMonthsTotals = await dashboardRepository.getInvoiceTotalsInRange(
    twoMonthsAgo,
    lastMonth,
    businessId,
  );

  const lastMonthsTotal = lastMonthsTotals.reduce(
    (c, curr) => c + parseFloat(curr.total),
    0,
  );

  if (lastMonthsTotal === 0) {
    return {
      total: thisMonthsTotal,
      comparison: "",
    };
  }

  const ratio = Math.round((thisMonthsTotal * 100) / lastMonthsTotal);

  const comparison =
    ratio < 100
      ? `-${100 - ratio}% from last month`
      : `+${ratio - 100}% from last month`;
  return {
    total: thisMonthsTotal,
    comparison,
  };
};
