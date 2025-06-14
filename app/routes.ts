import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./layouts/layout.tsx", [
    index("./routes/dashboard/dashboard.tsx"),
    layout("./layouts/settings-layout.tsx", [
      route("/profile-info", "./routes/user/profile-info.tsx"),
      route("/profile-address", "./routes/user/profile-address.tsx"),
    ]),
    route("/user-table", "./routes/tables/userTable.tsx"),
    route("/category-table", "./routes/tables/categoryTable.tsx"),
    route("/cuisine-table", "./routes/tables/cuisinesTable.tsx"),
    route("/restaurant-table", "./routes/tables/restaurantTable.tsx"),
    route("/restaurant/:id/menu-items", "./routes/tables/menuItemTable.tsx"),
    route("/restaurant/:id/orders", "./routes/tables/orderTable.tsx"),
    route("/restaurant/:id/reviews", "./routes/tables/reviewTable.tsx"),
    route("/restaurant/:id/promotions", "./routes/tables/promotionsTable.tsx"),
  ]),
  layout("./layouts/authLayout.tsx", [
    route("login", "./routes/auth/login.tsx"),
    route("/register", "./routes/auth/register.tsx"),
    route("/reset-pass", "./routes/auth/reset-pass.tsx"),
    route("/restore-pass", "./routes/auth/restore-pass.tsx"),
  ]),
  route("/logout", "./routes/logout.tsx"),
] satisfies RouteConfig;
