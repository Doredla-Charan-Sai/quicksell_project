import { Component } from 'react';
import { FormControl, Select, MenuItem, InputLabel, Box } from '@mui/material';
import urgentIcon from '../../assets/icons_FEtask/SVG - Urgent Priority colour.svg'
import feature from '../../assets/icons_FEtask/SVG - Urgent Priority grey.svg'
import './index.css';
import UserAvatar from '../UserAvatar';
import highIcon from '../../assets/icons_FEtask/Img - High Priority.svg';
import mediumIcon from '../../assets/icons_FEtask/Img - Medium Priority.svg';
import lowIcon from '../../assets/icons_FEtask/Img - Low Priority.svg';
import noPriorityIcon from '../../assets/icons_FEtask/No-priority.svg';
import dotsIcon from '../../assets/icons_FEtask/3 dot menu.svg'
import addIcon from '../../assets/icons_FEtask/add.svg'
import displayIcon from '../../assets/icons_FEtask/Display.svg'
import downIcon from '../../assets/icons_FEtask/down.svg'

const priorityMap = {
    4: { label: "Urgent", icon: urgentIcon },
    3: { label: "High", icon: highIcon },
    2: { label: "Medium", icon: mediumIcon },
    1: { label: "Low", icon: lowIcon },
    0: { label: "No priority", icon: noPriorityIcon },
};


class MainDisplay extends Component {
    state = {
        grouping: "status",
        ordering: "priority",
        showOptions: false ,
        tickets: [],
        users: []
    };

    componentDidMount() {
        const savedGrouping = localStorage.getItem('grouping');
        const savedOrdering = localStorage.getItem('ordering');
        
        this.setState({
            grouping: savedGrouping || this.state.grouping, 
            ordering: savedOrdering || this.state.ordering  
        });
        this.getApiCall();
    }

    getApiCall = async () => {
        const profileUrl = 'https://api.quicksell.co/v1/internal/frontend-assignment';
        const options = { method: 'GET' };
        const response = await fetch(profileUrl, options);
        if (response.ok === true) {
            const data = await response.json();
            const tickets_data = data.tickets.map(eachItem => ({
                id: eachItem.id,
                priority: eachItem.priority,
                status: eachItem.status,
                tag: eachItem.tag,
                title: eachItem.title,
                user_id: eachItem.userId
            }));
            const users_data = data.users.map(eachItem => ({
                id: eachItem.id,
                available: eachItem.available,
                name: eachItem.name
            }));
            this.setState({ tickets: tickets_data, users: users_data });
        }
    };

    handleGroupingChange = (event) => {
        const newGrouping = event.target.value;
        this.setState({ grouping: newGrouping });
        localStorage.setItem('grouping', newGrouping);
    };

    handleOrderingChange = (event) => {
        const newOrdering = event.target.value;
        this.setState({ ordering: newOrdering });
        localStorage.setItem('ordering', newOrdering); 
    };

    groupByField = (tickets, field) => {
        const groupedData = tickets.reduce((acc, ticket) => {
            const key = ticket[field]; 
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(ticket);
            return acc;
        }, {});
        return groupedData;
    };

    sortTickets = (tickets, ordering) => {
        return tickets.sort((a, b) => {
            if (ordering === 'priority') {
                return a.priority - b.priority;
            }
            if (ordering === 'title') {
                return a.title.localeCompare(b.title);
            }
            return 0;
        });
    };

    plusAndDots = () => {
        return (
            <div className='group-header'>
                <img 
                    src={addIcon} 
                    alt='add' 
                    style={{ width: '16px', height: '16px', marginRight: '8px' }} 
                />
                <img 
                    src={dotsIcon} 
                    alt='3 dots' 
                    style={{ width: '16px', height: '16px', marginRight: '8px' }} 
                />
            </div>
        )
    }

    renderGroupedAndOrderedTickets = () => {
        const { grouping, ordering, tickets, users } = this.state;
        const groupedTickets = this.groupByField(tickets, grouping);
        return (
            <div className="container">
                {Object.keys(groupedTickets).map(groupKey => {
                    let groupHeader = `${groupKey}`;
                    if (grouping === 'priority') {
                        const priorityInfo = priorityMap[groupKey]; 
                        groupHeader = (
                            <div className='group-header main-header'>
                                <div className="group-header">
                                    <img 
                                        src={priorityInfo.icon} 
                                        alt={priorityInfo.label} 
                                        style={{ width: '16px', height: '16px', marginRight: '8px' }} 
                                    />
                                    {priorityInfo.label} Priority
                                </div>
                                {this.plusAndDots()}
                            </div>                            
                        );
                    } 
                    
                    if (grouping==='status'){
                        groupHeader = (
                            <div className='group-header main-header'>
                                <h3>{groupKey}</h3>
                                {this.plusAndDots()}
                            </div>
                        )
                    }

                    const user = users.find(u => u.id === groupKey) || {};

                    if (grouping=== 'user_id'){
                        groupHeader = (
                            <div className='group-header main-header'>
                                <div className="group-header">
                                    <UserAvatar name={user.name || 'Unknown User'} /> {user.name || 'Unknown User'}
                                </div>
                                {this.plusAndDots()}
                            </div>
                        )
                    }
                    return (
                        <div key={groupKey} className="group">
                            {groupHeader}
                            {this.sortTickets(groupedTickets[groupKey], ordering).map(ticket => (
                                <div key={ticket.id} className="ticket-card">
                                    <div className="ticket-content">
                                        <div className="ticket-title">{ticket.id}</div>
                                        <h4>{ticket.title}</h4>
                                        <div className="ticket-details">
                                            <img 
                                                src={priorityMap[ticket.priority].icon} 
                                                alt='priority' 
                                                style={{ width: '16px', height: '16px', marginRight: '8px' }} 
                                            />
                                            <img 
                                                src={feature} 
                                                alt='feature request' 
                                                style={{ width: '16px', height: '16px', marginRight: '8px' }} 
                                            />
                                            <p>{ticket.tag}</p>
                                        </div>
                                    </div>
                                    <div className="ticket-image">
                                        <UserAvatar name={(users.find(u => u.id === ticket.user_id)).name || 'Unknown User'} /> 
                                    </div>
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>
        );
    };

    toggleDisplayOptions = () => {
        this.setState(prevState => ({ showOptions: !prevState.showOptions }));
    };

    render() {
        const { grouping, ordering, showOptions } = this.state;
        return (
            <div className='main-cont'>
                <button className='main-header display-btn' onClick={this.toggleDisplayOptions}>
                    <div className='group-header'>
                        <img 
                            src={displayIcon} 
                            alt='display icon'
                            style={{ width: '16px', height: '16px', marginRight: '8px' }} 
                        />
                        <p>Display</p>
                    </div>
                    <img 
                        src={downIcon} 
                        alt='down icon'
                        style={{ width: '16px', height: '16px', marginRight: '8px' }} 
                    />
                </button>
                {showOptions && <Box display="flex" flexDirection="column" p={2}>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="grouping-label">Grouping</InputLabel>
                        <Select
                            labelId="grouping-label"
                            value={grouping}
                            label="Grouping"
                            onChange={this.handleGroupingChange}
                        >
                            <MenuItem value="status">Status</MenuItem>
                            <MenuItem value="user_id">User</MenuItem>
                            <MenuItem value="priority">Priority</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <InputLabel id="ordering-label">Ordering</InputLabel>
                        <Select
                            labelId="ordering-label"
                            value={ordering}
                            label="Ordering"
                            onChange={this.handleOrderingChange}
                        >
                            <MenuItem value="priority">Priority</MenuItem>
                            <MenuItem value="title">Title</MenuItem>
                        </Select>
                    </FormControl>
                </Box>}
                {/* Render grouped and ordered tickets */}
                {this.renderGroupedAndOrderedTickets()}
            </div>
        );
    }
}

export default MainDisplay;
