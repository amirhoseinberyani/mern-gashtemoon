import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../screens/home";
import Users from "../screens/users";

export default function index() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/en" component={Home} />

      <Route exact path="/users" component={Users} />
      <Route exact path="/en/users" component={Users} />

    </Switch>
  );
}
