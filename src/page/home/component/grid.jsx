import React,{Component} from 'react'
import { Grid, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from '@/utils/axios'
import './grids.scss'

class Grids extends Component {
    constructor(props){
        super(props)
        this.state={
            menuList : []
        }
    }
    componentDidMount(){
        axios.post('/homes/menu').then(res=>{
            console.log(res);
            this.setState({
                menuList : res.data.list
            })
        })
    }
    render(){
        let list = this.state.menuList.map(item=>{
            return (
                <Grid.Column key={item.id} className={item.id%2?'cblue':'cpink'} onClick={this.props.gridChange.bind(this,item.id)}>
                 <div className='textc'>
                    <Icon name='home' size='large' />
                 </div>
                 <div className='textc'>{item.menu_name}</div>
                </Grid.Column>
            )
        })
        return (
            <div className='mygrid'>
                <Grid>
                    <Grid.Row columns={4}>
                        {list}
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

export default Grids