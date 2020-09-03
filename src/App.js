import React from "react";
import { Layout, Menu } from "antd";
import "antd/dist/antd.css";
import { Switch, Link, withRouter } from "react-router-dom";
import "./App.css";
import Users from "./components/Users/Users";
import NormalLoginForm from "./components/Login/Login";
import Leeds from "./components/LeedsList/leedsList";
import Quotes from "./components/Quotes/Quotes";
import CheatSheet from "./components/CheatSheet/CheatSheet";
import Tasks from "./components/Tasks/Tasks";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import LogOut from "./components/logOut/logOut";

const { Header, Content, Footer, Sider } = Layout;

class App extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <Layout>
        <Sider>
          <div className="logo" />
          {localStorage.getItem("token") && (
            <Menu theme="dark" mode="inline">
              <Menu.Item key="1">
                <Link to="/users" className="nav-text">
                  Users
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/leads" className="nav-text">
                  Leeds
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/quotes" className="nav-text">
                  Quotes
                  <Quotes />
                </Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/tasks" className="nav-text">
                  Tasks
                </Link>
              </Menu.Item>
              <Menu.Item key="5">
                <Link to="/cheatsheet" className="nav-text">
                  Cheat sheet
                </Link>
              </Menu.Item>
            </Menu>
          )}
        </Sider>
        <Layout>
          <Header className="header">
            {localStorage.getItem("token") ? (
              <LogOut history={history} key="1" />
            ) : (
              <NormalLoginForm history={history} key="2" />
            )}
          </Header>
          <Content style={{ margin: "24px 16px 0" }}>
            <div
              className="site-layout-background"
              style={{
                padding: 24,
                minHeight: "83vh",
              }}
            >
              <Switch>
                <PrivateRoute
                  path="/users"
                  component={() => <Users />}
                  key="1"
                />

                <PrivateRoute
                  path="/leads"
                  component={() => <Leeds />}
                  key="2"
                />
                <PrivateRoute
                  path="/quotes"
                  component={() => <Quotes />}
                  key="3"
                />

                <PrivateRoute
                  path="/tasks"
                  component={() => <Tasks />}
                  key="4"
                />
                <PrivateRoute
                  path="/cheatsheet"
                  component={() => <CheatSheet />}
                  key="5"
                />
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}></Footer>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(App);
