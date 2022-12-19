export type RootNavigationStackParams = {
  Meals: {
    categoryId: string;
    title: string;
  };
  MealDetails: {
    mealId: string;
  };
  Drawer: undefined;
};

export type DrawerNavigationParams = {
  Categories: undefined;
  Favorites: undefined;
};

export type GlobalNavigationParams = RootNavigationStackParams &
  DrawerNavigationParams;
