import React,{Component} from 'react'
import FootNav from '@/components/footNav'
import {Icon,Tab } from 'semantic-ui-react';
import './index.scss'
class First extends Component{
    render(){
        return (
            <div>对对对</div>
        )
    }
}

class Info extends Component {
    render(){
        const panes = [
            { menuItem: '咨询', render: () => <Tab.Pane><First/></Tab.Pane> },
            { menuItem: '头条', render: () => <Tab.Pane>商业贷款</Tab.Pane> },
            { menuItem: '问答', render: () => <Tab.Pane>组合贷款</Tab.Pane> },
        ]
        return (
            <div>
                <div className='home-calc'>
                <div className = "home-calc-title">
                    资讯
                </div> 
                <div className = "map-calc-content">
                    <Tab className='home-calc-label' panes={panes} />
                </div>
                </div>
                <FootNav  type='info'/>
            </div>
        )
    }
}

export default Info