import React,{Component} from 'react'
import FootNav from '@/components/footNav'
import Carousel from './component/carousel'
import Grid from './component/grid'
import Consult from './component/consult'
import GoodsList from './component/goodsList'
import Calculator from './component/calculator'
import List from './component/list'
import { Input } from 'semantic-ui-react'

import './index.scss'

class Home extends Component {
    constructor(props){
        super(props)
        this.state={
            id: 0,
            calcShow: false,
            listShow: false
        }
    }
    // 创建个点击事件,当点击时,改变状态,控制显示和隐藏
    gridChange=(id)=>{
        // 所有的点击事件
        console.log(123);
        console.log(id);
        if(id===7){
            this.setState({
                calcShow: !this.state.calcShow
            })
        }else if(id<5){
            this.setState({
                id: id,
                listShow: true
            })
        }else if(id===8){
            this.props.history.push('/info')
        }else if(id===5){
            this.props.history.push('/home/map')
        }
    }
    calcChange=()=>{
        this.setState({
            calcShow: !this.state.calcShow
        })
    }
    listChange=()=>{
        this.setState({
            listShow: !this.state.listShow
        })
    }
    render(){
        // 通过改变ListChange事件来判断
        return (
            <div>
                {this.state.calcShow&&<Calculator gridChange={this.calcChange}/>}
                {this.state.listShow&&<List gridChange={this.listChange} id={this.state.id}/>}
                <div className='input'>
                    <Input fluid icon={{name: 'search', circular: true, link: true}} placeholder='Search...'/>
                </div>
                <div className='mt38'>
                    <Carousel></Carousel>
                    <Grid gridChange={this.gridChange}></Grid>
                    <Consult></Consult>
                    <GoodsList></GoodsList>
                </div>
                <FootNav type='home'/>
            </div>
        )
    }
}

export default Home