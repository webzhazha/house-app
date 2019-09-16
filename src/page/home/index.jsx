import React,{Component} from 'react'
import FootNav from '@/components/footNav'
import Carousel from './component/carousel'
import Grid from './component/grid'
import Consult from './component/consult'
import GoodsList from './component/goodsList'
import Calculator from './component/calculator'
import { Input } from 'semantic-ui-react'

import './index.scss'

class Home extends Component {
    constructor(props){
        super(props)
        this.state={
            calcShow: true
        }
    }
    // 创建个点击事件,当点击时,改变状态,控制显示和隐藏
    calcChange=()=>{
        this.setState({
            calcShow: !this.state.calcShow
        })
    }
    render(){
        return (
            <div>
                {this.state.calcShow&&<Calculator calcChange={this.calcChange}/>}
                <div className='input'>
                    <Input fluid icon={{name: 'search', circular: true, link: true}} placeholder='Search...'/>
                </div>
                <div className='mt38'>
                    <Carousel></Carousel>
                    <Grid calcChange={this.calcChange}></Grid>
                    <Consult></Consult>
                    <GoodsList></GoodsList>
                </div>
                <FootNav type='home'/>
            </div>
        )
    }
}

export default Home