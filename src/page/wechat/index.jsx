import React,{Component} from 'react'
import axios from '@/utils/axios'
import Im from './im.jsx'
import FootNav from '@/components/footNav'
import './index.scss'

class Info extends Component {
    constructor(props){
        super(props)
        this.state={
            listData: [],
            show: false,
            currentInfo: {}
        }

    }
    componentDidMount(){
        axios.post('/chats/list').then(res=>{
            console.log(res);
            this.setState({
                listData: res.data.list
            })
        })
    }
    toChat=(item)=>{
        console.log(item);
        this.setState({
            show: true,
            currentInfo: {
                username: item.username,
                from_user: item.from_user,
                to_user: item.to_user,
                avatar: item.avatar
            }
        })
    }
    hideChat=(item)=>{
        this.setState({
            show: !this.state.show
        })
    }
    render(){
        const list = this.state.listData.map(item=>{
            return (
                <li key={item.id} onClick={this.toChat.bind(this,item)}>
                    <div className="avarter">
                        <img src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1569688526&di=405f4102d72942717b0d3b6e87ebc375&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01650e57e4a6fa0000012e7e6eab80.png%401280w_1l_2o_100sh.png' alt="avarter"/>
                        <span className="name">{item.username}</span>
                        <span className="info">{item.chat_msg}</span>
                        <span className="time">{item.ctime}</span>
                    </div>
                </li>
            )
        })
        return (
            <div className='chat-container'>
                <div className="chat-title">聊天</div>
                <div className="chat-list">
                <ul>
                    {list}
                </ul>
                </div>
                <FootNav type='wechat' />
                {this.state.show && <Im hideChat={this.hideChat} currentInfo={this.state.currentInfo} />}
            </div>
        )
    }
}

export default Info