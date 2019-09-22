import React,{Component} from 'react'
import { Icon } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import BMap from 'BMap';
import axios from '@/utils/axios'
import './map.scss'

class Map extends Component{
    constructor(props){
        super(props);
        this.state = {
          list: []
        }
    }
    initMap = (callback) => {
        // 产生地图效果
        // 百度地图API功能
        // var BMap = window.BMap;
        var BMapLib = window.BMapLib;
        // 创建Map实例
        var map = new BMap.Map("allmap");
        // 初始化地图,设置中心点坐标和地图级别
        map.centerAndZoom(new BMap.Point(116.43244, 39.929986), 12); 
        // 添加地图类型控件
        map.addControl(new BMap.MapTypeControl()); 
        // 设置地图缩放
        map.addControl(new BMap.ScaleControl({
          anchor: window.BMAP_NAVIGATION_CONTROL_ZOOM
        }));
        // 设置地图导航
        map.addControl(new BMap.NavigationControl({
          enableGeolocation: true
        }));
        // 设置缩略图控件。
        map.addControl(new BMap.OverviewMapControl());
        // 设置地图显示的城市 此项是必须设置的
        map.setCurrentCity("北京"); 
        // 开启鼠标滚轮缩放
        map.enableScrollWheelZoom(true); 
        // ----------------------------------------------
        let xy = this.state.list;
        var markers = [];
        var pt = null;
        for (var i in xy) {
          pt = new BMap.Point(xy[i].x, xy[i].y);
          markers.push(new BMap.Marker(pt));
        }
        // 地图上覆盖物的聚合效果地图上覆盖物的聚合效果
        var markerClusterer = new BMapLib.MarkerClusterer(map, {
          markers: markers,
          girdSize: 100,
          styles: [{
            background: 'rgba(12,181,106,0.9)',
            size: new BMap.Size(92, 92),
            textSize: '16',
            textColor: '#fff',
            borderRadius: 'true'
          }],
        });
        markerClusterer.setMaxZoom(50);
        markerClusterer.setGridSize(10);
    }
    async  componentDidMount () {
        await  axios.post('/homes/map',{type:1}).then(res=>{
            this.setState({
                list: res.data
            })
        })
        this.initMap()
    }
    returnhome=()=>{
        this.props.history.goBack()
    }
    render(){
        return (
            <div className = 'map-house' >
                <div className = "map-house-title">
                <Icon name = 'angle left' size = 'large' onClick={this.returnhome} /> 地图找房
                </div>
                <div className = "map-house-content" id='allmap'>
                </div>
            </div>
        )
    }
}

export default withRouter(Map)