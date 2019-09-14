// 路由文件
import React from 'react'
import { BrowserRouter as HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import asyncComponent from '@/utils/asyncComponent'
// 导入文件
const Login = asyncComponent(() => import("@/page/login/index"))
const Home = asyncComponent(() => import("@/page/home/index"))

class RouteConfig extends React.Component {
    render(){
        return (
            <HashRouter>
                <Switch>
                    <Route exact path='/' component={Login}></Route>
                    <Route path='/home' component={Home}></Route>
                    <Redirect to='/' ></Redirect>
                </Switch>
            </HashRouter>
        )
    }
}

export default RouteConfig