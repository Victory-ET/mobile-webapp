import React, { Component } from 'react';
import { connect } from 'react-redux';

import ChatBox from '../_components/ChatBox';
import { fetchAllMessages } from '../_actions/actions';
import TopBar from '../_components/TopBar';


const mainHeader = <h2 className="app_name">Converge</h2>
const icons = [
    <div key={0} className="icon_div">
        <div className="touch_indicator">
            <i className="fas fa-plus"></i>
        </div>
    </div>,
    <div key={1} className="icon_div">
        <div className="touch_indicator">
            <i className="fas fa-search"></i>
        </div>
    </div>,
    <div key={2}className="icon_div">
        <div className="touch_indicator">
            <div className="menu_bar">
                <div className="menu_line"></div>
                <div className="menu_line"></div>
                <div className="menu_line"></div>
            </div>
        </div>
    </div>
]

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        
    }

    componentDidMount() {
        this.props.fetchMessages();
    }

    render() {
        return(
            <div>
                <TopBar
                    main={mainHeader}
                    icons={icons}
                />
                <Navigation />
                <ChatBoxesCover persons={this.props.messages}/>
            </div>
        )
    }
}


class Navigation extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="nav_box">
                <NavItem isActive={false} details="All"/>
                <NavItem isActive={true} details="Important"/>
                <NavItem isActive={false} details="Unread"/>
                <NavItem isActive={false} details="Read"/>
            </div>
        )
    }
}

const NavItem = ({ isActive = false, details }) => {
    return (
        <div 
            className="nav_item" 
            style={{
                background: isActive ? '#30f' : 'white',
                color: isActive ? 'white' : 'black'
            }}
        >
            {details}
        </div>
    )
}

const ChatBoxesCover = ({ persons }) => {
    const personsArray = Object.keys(persons)
    const messageBoxes = personsArray.map(person => {
        
        let messages = persons[person].messages; //e.g person['jeff'].messages
        let lastMessage = messages[messages.length-1];
        let lastMessageTime = new Date(lastMessage.time);
        let dateDifference = new Date().getDay() - lastMessageTime.getDay(); // check difference in date
        return (
            <ChatBox 
                key={persons[person]._id}
                img_src="https://cdn.pixabay.com/photo/2017/01/18/17/14/girl-1990347_960_720.jpg"
                name={`${persons[person].first_name} ${persons[person].last_name}`}
                lastMessage={`${lastMessage.content}`}
                id={`${person}`}
                lastMessageTime={
                    dateDifference == 0
                    ? `${lastMessageTime.getHours()}:${lastMessageTime.getMinutes()}`
                    : dateDifference === 1 
                    ? 'Yesterday'
                    : `${lastMessageTime.getDate()}/${lastMessageTime.getMonth()+1}/${lastMessageTime.getFullYear()}`
                }
                unreadCount={2}
                online={true}
            />
        )
    });

    return (
        <div className="chat_boxes_cover">
            {messageBoxes}
        </div>
    )
}

const mapStateToProps = (state) => {
    return { ...state.messages }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchMessages: () => dispatch(fetchAllMessages())
    }
}

const connectedHomeScreen = connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

export { connectedHomeScreen as HomeScreen };