import React,{Component} from 'react'
import { Grid, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import '../style/footNav.scss'

class Foot extends Component {
    constructor(props){
        super(props)
        this.state={
            type: ''
        }
    }
    componentWillMount(){
        this.setState({
            type: this.props.type
        })
    }
    render(){
        return (
            <div className='myGrid'>
                <Grid columns={4}>
                    <Grid.Row >
                        <Grid.Column className='textc'>
                            <Link to='/home' className={`${this.state.type === 'home'?'active':''} `}>
                                <Icon name='home'  size='large' />
                                <div className='mt5'>主页</div>
                            </Link>
                        </Grid.Column >
                        <Grid.Column className='textc'>
                            <Link to='/info' className={`${this.state.type === 'info'?'active':''} `}>
                                <Icon name='server'  size='large' />
                                <div className='mt5'>资讯</div>
                            </Link>
                        </Grid.Column>
                        <Grid.Column className='textc'>
                            <Link to='/wechat' className={`${this.state.type === 'wechat'?'active':''} `}>
                                <Icon name='comment outline'  size='large' />
                                <div className='mt5'>微聊</div>
                            </Link>
                        </Grid.Column>
                        <Grid.Column className='textc'>
                            <Link to='/personal' className={`${this.state.type === 'personal'?'active':''} `}>
                                <Icon name='user md'  size='large' />
                                <div className='mt5'>我的</div>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

export default Foot