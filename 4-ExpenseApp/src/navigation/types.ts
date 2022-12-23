export type BottomTabParams = {
  AllExpenses: undefined;
  Recent: undefined;
};

export type RootStackNavigationParams = {
  ManageExpense: {
    expenseId?: string;
  };
  BottomTab: BottomTabParams;
};

export type GlobalNavigationParams = RootStackNavigationParams &
  BottomTabParams;
