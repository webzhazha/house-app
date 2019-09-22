import React,{Component} from 'react'
import { Form,Icon,Button,TextArea } from 'semantic-ui-react'
import axios from '@/utils/axios'
import handle from './wsmain.js';
import IMEvent from './IMEvent.js';
import './im.scss'

class Im extends Component {
    constructor(props){
        super(props)
        this.state={
            msgList: [],
            msgContent: ''
        }
    }
    componentDidMount(){
        // 解构赋值,将数据填充
        const {from_user,to_user} = this.props.currentInfo
        axios.post('chats/info',{
            from_user,
            to_user
        }).then(res=>{
            console.log(res);
            // 注册用户id
            let currentUser = localStorage.getItem('uid')
            let client = handle(currentUser, data=>{
                // 处理ws返回的数据
                let newList = [...this.state.msgList]
                newList.push(JSON.parse(data.content))
                this.setState({
                    msgList: newList
                })
            })
            this.setState({
                msgList: res.data.list,
                client: client
            })
        })
    }
    handleMsgChange=(e)=>{
        this.setState({
            msgContent: e.target.value
        })
    }
    sendMsg=()=>{
        // 发送消息
        const {from_user, to_user, avatar} = this.props.currentInfo;
        let pdata = {
            id: new Date().getTime(),
            from_user: from_user,
            to_user: to_user,
            avatar: avatar,
            chat_msg: this.state.msgContent
        }
        this.state.client.emitEvent(IMEvent.MSG_TEXT_SEND,JSON.stringify(pdata))
        let newArr = [...this.state.msgList, pdata]
        this.setState({
            msgList: newArr,
            msgContent: ''
        })
    }
    render(){
        const {username} = this.props.currentInfo
        // 获取当前用户值,来判断是向左还是向右
        let currentUser = parseInt(localStorage.getItem('uid'),10)
        const listContent = this.state.msgList.map(item=>{
            return (
                <li key={item.id} className={currentUser===item.to_user? 'chat-info-left':'chat-info-right'}>
                  <img src={currentUser===item.to_user?'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1569688526&di=405f4102d72942717b0d3b6e87ebc375&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01650e57e4a6fa0000012e7e6eab80.png%401280w_1l_2o_100sh.png':'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1569097274725&di=0c1b55db1519674b3db4ca56ca901645&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01786557e4a6fa0000018c1bf080ca.png'} alt=""/>
                  <span>{item.chat_msg}</span>
                </li>
            )
        })
        return (
            <div className='chat-window'>
                <div className="chat-window-title">
                <Icon onClick={this.props.hideChat} name='angle left' className='chat-ret-btn' size='large'/>
                <span>{username}</span>
                </div>
                <div className="chat-window-content">
                <ul>
                    {listContent}
                </ul>
                </div>
                <div className="chat-window-input">
                <Form>
                    <TextArea value={this.state.msgContent} onChange={this.handleMsgChange} placeholder='请输入内容...' />
                    <Button onClick={this.props.hideChat}>关闭</Button>
                    <Button primary onClick={this.sendMsg}>发送</Button>
                </Form>
                </div>
            </div>
        )
    }
}

export default Im