import React,{Component} from 'react'
import { Icon } from 'semantic-ui-react'
import axios from '@/utils/axios'
import './consult.scss'

class Consolt extends Component {
    constructor(props){
        super(props)
        this.state={
            infoList: []
        }
    }
    componentDidMount(){
        axios.post('homes/info').then(res=>{
            this.setState({
                infoList: res.data.list
            })
        })
    }
    render(){
        let infoList = this.state.infoList.map(item=>{
            return (
                <div className='elli' key={item.id}>
                        <span className='point'>限购 ●</span>
                        <span>{item.info_title}</span>
                </div>
            )
        })
        return (
            <div className='myGroup'>
                <div className='one'>
                    <img src='http://47.96.21.88:8086/public/zixun.png' />
                </div>
                <div className='two'>
                    {infoList}
                </div>
                <div className='thr'>
                    <Icon name='angle double right' />
                </div>
            </div>
        )
    }
}

export default Consolt