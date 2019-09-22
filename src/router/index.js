// 路由文件
import React from 'react'
import { BrowserRouter as HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import asyncComponent from '@/utils/asyncComponent'
// 导入文件
const Login = asyncComponent(() => import("@/page/login/index"))
const Home = asyncComponent(() => import("@/page/home/index"))
const Info = asyncComponent(() => import("@/page/info/index"))
const Wechat = asyncComponent(() => import("@/page/wechat/index"))
const Personal = asyncComponent(() => import("@/page/personal/index"))
const Map = asyncComponent(() => import("@/page/home/map"))

class RouteConfig extends React.Component {
    render(){
        return (
            <HashRouter>
                <Switch>
                    <Route exact path='/' component={Login}></Route>
                    <Route exact path='/home' component={Home}></Route>
                    <Route exact path='/home/map' component={Map}></Route>
                    <Route path='/info' component={Info}></Route>
                    <Route path='/wechat' component={Wechat}></Route>
                    <Route path='/personal' component={Personal}></Route>
                    <Redirect to='/' ></Redirect>
                </Switch>
            </HashRouter>
        )
    }
}

export default RouteConfig