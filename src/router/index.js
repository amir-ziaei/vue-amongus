/* eslint no-use-before-define: 0 */

import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";
import Home from "../views/Home.vue";

import guest from './middleware/guest'
import auth from './middleware/auth'
import middlewarePipeline from './middlewarePipeline'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/Register.vue"),
    meta: { middleware: [guest] }
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
      meta: { middleware: [guest] }
  },
  {
    path: "/gallery",
    name: "Gallery",
    component: () =>
      import(/* webpackChunkName: "gallery" */ "../views/Gallery.vue")
  },
  {
    path: "/contact",
    name: "Contact",
    component: () =>
      import(/* webpackChunkName: "contact" */ "../views/Contact.vue")
  },
  {
    path: "/articles/new/",
    name: "ArticleNew",
    component: () =>
      import(/* webpackChunkName: "article-new" */ "../views/ArticleNew.vue"),
      meta: { middleware: [auth] }
  },
  {
    path: "/articles/:slug",
    name: "Article",
    component: () =>
      import(/* webpackChunkName: "article" */ "../views/Article.vue")
  },
  {
    path: "/articles/:slug/edit",
    name: "ArticleEdit",
    component: () =>
      import(/* webpackChunkName: "article-edit" */ "../views/ArticleEdit.vue"),
      meta: { middleware: [auth] }
  },
  {
    path: "/users/:id/edit",
    name: "Dashboard",
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "../views/Dashboard.vue"),
      meta: { middleware: [auth] }
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
      return next()
  }
  const middleware = to.meta.middleware
  const context = {
      to,
      from,
      next,
      store
  }
  return middleware[0]({
      ...context,
      next: middlewarePipeline(context, middleware, 1)
  })
})

export default router;
