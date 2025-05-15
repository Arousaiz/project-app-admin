import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./layouts/layout.tsx", [
    index("./routes/dashboard/dashboard.tsx"),
    route("/profile", "./routes/user/profile.tsx"),
    route("/user-table", "./routes/tables/user/userTable.tsx"),
    route("/category-table", "./routes/tables/category/categoryTable.tsx"),
    route(
      "/restaurant-table",
      "./routes/tables/restaurant/restaurantTable.tsx"
    ),
    route(
      "//restaurant/:id/menu-items",
      "./routes/tables/menuItem/menuItemTable.tsx"
    ),
  ]),
  layout("./layouts/authLayout.tsx", [
    route("login", "./routes/auth/login.tsx"),
    route("/register", "./routes/auth/register.tsx"),
    route("/reset-pass", "./routes/auth/reset-pass.tsx"),
    route("/restore-pass", "./routes/auth/restore-pass.tsx"),
  ]),
  route("/test", "./routes/home.tsx"),
  route(
    "/.well-known/appspecific/:path",
    "./routes/globalActions/action.stfuplz.ts"
  ),
  route("/actions/set-theme", "./routes/globalActions/action.set-theme.ts"),
  route("/logout", "./routes/logout.ts"),
] satisfies RouteConfig;
