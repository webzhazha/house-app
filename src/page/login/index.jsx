import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import axios from '@/utils/axios'
import { Button, Input } from 'semantic-ui-react'
import Toast from '@/components/toast/index.js'
import './index.scss'


class Login extends Component {
    constructor(props){
        super(props)
        this.state={
            name: '',
            pas: ''
        }
    }
    nameChange=(e)=>{
        this.setState({
            name: e.target.value
        })
    }
    pasChange=(e)=>{
        this.setState({
            pas: e.target.value
        })
    }
    submit=()=>{
        const { history } =this.props
        axios.post('/users/login',{
            uname: this.state.name,
            pwd: this.state.pas
        }).then(res=>{
            if(res.meta.status===200){
                localStorage.setItem('token',res.data.token)
                localStorage.setItem('uid',res.data.uid)
                history.push('/home')
            }else {
                Toast.info('账号或密码错误!')
            }
        })
    }
    render(){
        return (
            <div className='login'>
                <div className='title textc'>登录</div>
                <div className='w_90 pl_10 mt20'>
                    <Input className='w_100' icon='user secret' value={this.state.name}  onChange={this.nameChange} iconPosition='left' placeholder='账号' />
                </div>
                <div className='w_90 pl_10 mt20'>
                    <Input type='password' className='w_100' icon='sign-out' iconPosition='left'  value={this.state.pas} onChange={this.pasChange} placeholder='密码' />
                </div>
                <div className='textc mt20'>
                    <Button className="ui button primary w_80" onClick={this.submit}>登录</Button>
                </div>
            </div>
        )
    }
}

export default withRouter(Login)