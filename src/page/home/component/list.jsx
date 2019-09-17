import React from 'react';
import { Icon } from 'semantic-ui-react';
import axios from '@/utils/axios'
// import axios from 'axios'
import './list.scss';

class List extends React.Component{
    constructor(props){
        super(props)
        this.state={
            list: [],
            title: ''
        }
    }
    componentDidMount(){
        axios.post('/homes/list',{home_type:this.props.id}).then(res=>{
            console.log(res);
            this.setState({
                list: res.data
            })
        })
        switch (this.props.id){
            case 1 :{
                this.setState({
                    title: '新'
                })
            }
            break;
            case 2 :{
                this.setState({
                    title: '二'
                })
            }
            break;
            case 3 :{
                this.setState({
                    title: '租'
                })
            }
            break;
            case 4 :{
                this.setState({
                    title: '海'
                })
            }
            break;
        }
    }
    render(){
        let arr = this.state.list.map((item,index)=>{
            return (
                <div className='detail' key={item.id}>
                    <div>
                        <img src="http://47.96.21.88:8086/public/home.png" alt=""/>
                    </div>
                    <div className='ml10'>
                        <div className='fz20 bold'>{item.home_name}</div>
                        <div className='c999 mt5 mb5'>{item.home_desc}</div>
                        <div className='orange'>{item.home_price}</div>
                    </div>
                </div>
            )
        })
        return (
            <div className='home-calc'>
                <div className = "home-calc-title">
                <Icon name='angle left' size = 'large' onClick={this.props.gridChange}/>{this.state.title}
                </div> 
                <div className = "map-calc-content">
                {arr}
                </div>
            </div>
        )
    }
}

export default List