import React,{Component} from 'react'
import { Grid,Icon,Button,Modal } from 'semantic-ui-react'
import AvatarEditor from 'react-avatar-editor'
import axios from '@/utils/axios'
import './index.scss'
import Toast from '@/components/toast/index.js'
import FootNac from '@/components/footNav'

// 弹窗
class Models extends Component {
    constructor(props){
        super(props)
        this.fileInput = React.createRef()
        this.state={
            size: 'small'
        }
    }
    eidtImg=()=>{
        console.log(this.fileInput.current.files[0]);
        this.props.clickModal(this.fileInput.current.files[0])
    }
    render(){
        const {open} = this.props
        return (
            <div>
                <Modal size={this.state.size} open={open}>
                    <Modal.Header>选择图片</Modal.Header>
                    <Modal.Content>
                        <input type="file" ref={this.fileInput} />
                    </Modal.Content>
                    <Modal.Actions>
                        <Button positive icon='checkmark'
                        labelPosition='right' content='确定' onClick={this.eidtImg}/>
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}
// 修改
class Avatar extends Component {
    constructor(props){
        super(props)
        this.state = {
            size: 'small',
            value: '',
            scale: 1
          };
    }
    setEditorRef = editor => {
        if (editor) this.editor = editor
    }
    submitImg=()=>{
        const img = this.editor.getImageScaledToCanvas().toDataURL()
        axios.post('/my/avatar',{
            avatar: img
        }).then(res=>{
            console.log(res);
            if(res.meta.status===200){
                this.props.updateAvatar(img)
            }else{
                this.props.closeAvatar()
                Toast.info('保存失败')
            }
        })
    }
    handleScale=(e)=>{
        const scale = parseFloat(e.target.value)
        this.setState({
            scale: scale
        })
    }
    render(){
        const {opens,imgs} = this.props
        return (
            <Modal size='small' open={opens}>
                    <Modal.Header>上传图像</Modal.Header>
                    <Modal.Content>
                    <AvatarEditor
                        ref={this.setEditorRef}
                        image={imgs}
                        width={160}
                        height={160}
                        border={50}
                        color={[255, 255, 255, 0.6]} // RGBA
                        rotate={0}
                        scale={this.state.scale}
                    />
                    <div>
                    <span className='avatar-zoom'>缩放:</span>
                    <input
                        name="scale"
                        type="range"
                        onChange={this.handleScale}
                        min={'1'}
                        max="2"
                        step="0.01"
                        defaultValue="1"
                    />
                    </div>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button positive icon='checkmark'
                        labelPosition='right' content='确定' onClick={this.submitImg}/>
                    </Modal.Actions>
            </Modal>
        )
    }
}

class Info extends Component {
    constructor(props){
        super(props)
        this.state={
            name: '',
            img: '',
            open: false,
            opens: false,
            imgs: ''
        }
    }
    componentDidMount(){
        axios.post('/my/info',{user_id: 4}).then(res=>{
            this.setState({
                name: res.data.username,
                img: res.data.avatar,
            })
        })
    }
    clickModal=(info)=>{
        // 如果是打开状态,将编辑框打开,否则关闭
        if(this.state.open){
            this.setState({
                open: !this.state.open,
                opens: true,
                imgs: info
            })
        }else {
            this.setState({
                open: !this.state.open
            })
        }
    }
    updateAvatar=(img)=>{
        this.setState({
            img: img,
            opens: false
        })
    }
    // 当保存失败时,关闭编辑框
    closeAvatar=()=>{
        this.setState({
            opens: false
        })
    }
    render(){
        return (
            <div className='my-container'>
                <FootNac type='personal'/>
                <Avatar opens={this.state.opens} imgs={this.state.imgs} updateAvatar={this.updateAvatar} closeAvatar={this.closeAvatar}></Avatar>
                <Models open={this.state.open} clickModal={this.clickModal}></Models>
                <div className='my-title'>
                <img  src={'http://47.96.21.88:8086/public/my-bg.png'} alt='me'/>
                <div className="info">
                    <div className="myicon">
                    <img src={this.state.img} alt="icon" onClick={this.clickModal}/>
                    </div>
                    <div className='name'>{this.state.name}</div>
                    <Button color='green' size='mini'>已认证</Button>
                    <div className='edit'>编辑个人资料</div>
                </div>
                </div>
                <Grid padded  className='my-menu'>
                <Grid.Row columns={3}>
                    <Grid.Column>
                    <Icon name='clock outline' size='big' />
                    <div>看房记录</div>
                    </Grid.Column>
                    <Grid.Column>
                    <Icon name='yen sign' size='big' />
                    <div>我的订单</div>
                    </Grid.Column>
                    <Grid.Column>
                    <Icon name='bookmark outline' size='big' />
                    <div>我的收藏</div>
                    </Grid.Column>
                    <Grid.Column>
                    <Icon name='user outline' size='big' />
                    <div>个人资料</div>
                    </Grid.Column>
                    <Grid.Column>
                    <Icon name='home' size='big' />
                    <div>身份认证</div>
                    </Grid.Column>
                    <Grid.Column>
                    <Icon name='microphone' size='big' />
                    <div>联系我们</div>
                    </Grid.Column>
                </Grid.Row>
                </Grid>
                <div className='my-ad'>
                <img src={'http://47.96.21.88:8086/public/ad.png'} alt=""/>
                </div>
            </div>
        )
    }
}

export default Info

// 编辑图片逻辑
// 点击头像,选择图片弹窗展开
// 当选择图片点击确定之后,选择窗关闭,编辑框打开,同时将图片信息传给父组件,再传递到编辑图片
// 编辑确定之后,将转化的信息转化为base64.发送请求,如果成功,关闭弹窗,将图片信息更新,如果失败,关闭弹窗,提示