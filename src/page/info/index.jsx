import React,{Component} from 'react'
import FootNav from '@/components/footNav'
import {Item,Tab } from 'semantic-ui-react';
import Tloader from 'react-touch-loader'
import axios from '@/utils/axios'
import './index.scss'
import './tab.scss'
class First extends Component{
    constructor(props){
        super(props)
        this.state={
            initializing:0,//进度条
            hasMore: true,
            list: [],
            pagenum: 1
        }
    }
    componentDidMount(){
        this._getData()
    }

    // 封装请求
    _getData=()=>{
        axios.post('/infos/list',{
            pagenum: this.state.pagenum,
            pagesize: 2,
            type: this.props.type
        }).then(res=>{
            if(res.data.list.data.length===0){
                this.setState({
                    hasMore: false
                })
            }else {
                this.setState({
                    list: this.state.list.concat(res.data.list.data)
                })
            }
        })
    }
    refresh=(resolve, reject)=>{
        console.log('上拉刷新');
        setTimeout(()=>{
            this.setState({
                pagenum: 1,
                list: []
            })
            this._getData()
        },1000)
        resolve()
    }
    loadMore=(resolve)=>{
        console.log('加载更多');
        setTimeout(()=>{
            this.setState({
                pagenum: this.state.pagenum+1
            })
            this._getData()
        },1000)
        resolve()
    }
    render(){
        const {hasMore,initializing} = this.state
        const arr = this.state.list.map((item,index)=>{
            return (
                <Item key={index}>
                    <Item.Image size='small' src='http://47.96.21.88:8086/public/1.png' />
                    <Item.Content verticalAlign='middle'>
                    <Item.Header className='info-title'>{item.info_title}</Item.Header>
                    <Item.Meta>
                        <span className='price'>$1200</span>
                        <span className='stay'>1 Month</span>
                    </Item.Meta>
                    </Item.Content>
                </Item>
            )
        })
        return (
            <div>
                <Tloader
                    className="main"
                    onRefresh={(resolve, reject) => this.refresh(resolve, reject)}
                    onLoadMore={(resolve) => this.loadMore(resolve)}
                    hasMore={hasMore}
                    initializing={initializing}>
                    <ul>
                        {arr}
                    </ul>
                </Tloader>
            </div>
        )
    }
}

class Info extends Component {
    render(){
        const panes = [
            { menuItem: '咨询', render: () => <Tab.Pane><First type='1'/></Tab.Pane> },
            { menuItem: '头条', render: () => <Tab.Pane><First type='2'/></Tab.Pane> },
            { menuItem: '问答', render: () => <Tab.Pane>问答</Tab.Pane> },
        ]
        return (
            <div>
                <div className='find-container'>
                   <div className="find-topbar">资讯</div>
                   <div className="find-content">
                     <Tab panes={panes} />
                   </div>
                 </div>
                <FootNav  type='info'/>
            </div>
        )
    }
}

export default Info