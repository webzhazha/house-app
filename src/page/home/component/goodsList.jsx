import React,{Component} from 'react'
import { Button } from 'semantic-ui-react'
import axios from '@/utils/axios'
import './goodsList.scss'

class GoodsList extends Component {
    constructor(props){
        super(props)
        this.state={
            list: []
        }
    }
    componentDidMount(){
        axios.post('/homes/house').then(res=>{
            console.log(res);
            this.setState({
                list: res.data.list
            })
        })
    }
    render(){
        let newhouse = []
        let oldhouse = []
        let family = []
        this.state.list.map((item,index)=>{
            let tags = item.home_tags.split(',').map((tag,index)=>{
                return <Button basic color='green' size='mini' key={index}>
                {tag}
                </Button>
            })
            let arr = (
                <div className='detail' key={item.id}>
                    <div>
                        <img src="http://47.96.21.88:8086/public/home.png" alt=""/>
                    </div>
                    <div className='ml10'>
                        <div className='fz20 bold'>{item.home_name}</div>
                        <div className='c999 mt5 mb5'>{item.home_desc}</div>
                        <div className=''>
                        {tags}
                        </div>
                        <div className='orange'>4511</div>
                    </div>
                </div>
            )
            if(index<2){
                newhouse.push(arr)
            }else if(index===2 || index===3) {
                oldhouse.push(arr)
            }else {
                family.push(arr)
            }
        })
        return (
            <div>
                <div className='title'>最新开盘</div>
                {newhouse}
                <div className='title'>最新开盘</div>
                {oldhouse}
                <div className='title'>组一个家</div>
                {family}
            </div>
        )
    }
}

export default GoodsList