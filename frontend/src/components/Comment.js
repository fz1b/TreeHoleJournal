import { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import { FiMoreVertical } from 'react-icons/fi';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import styled from 'styled-components';
import { getCommentAuthor } from '../services/JournalServices';

const Name = styled.span`
    font-size: 0.9rem;
    font-weight: bolder;
`;
const Date = styled.span`
    font-size: 0.8rem;
    color: grey;
`;

// const DeletedName = styled.span`
//     font-size: 0.9rem;
//     font-weight: bolder;
//     color: grey;
// `;

function Comment(props) {
    const [name, setName] = useState('name');
    const [initial, setInitial] = useState('');
    const [anchorEl,setAnchorEl] = useState(null);
    const [isEditable, setIsEditable] = useState(false);

    const handleCommentEdit = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCommentEditClose = () => {
        setAnchorEl(null);
    };
    const handleDelete  = () =>{
        props.handleDeleteComment(props.comment._id)
    }
    useEffect(()=>{
        getCommentAuthor(props.journalID, props.comment._id)
        .then((res) => {
            setName(res.name);
            setInitial(res.name.charAt(0));
            if (res.name=== props.myName || props.authorMode) {
                setIsEditable(true);
            } else {
                setIsEditable(false);
            }
        })
        .catch((err) => {
            // do nothing, display empty profile pic
        });
    },[props.journalID, props.comment._id, props.myName, props.authorMode])

    return (
        <Box display='flex' mb={2}>
            {name && <Avatar>{initial} </Avatar>}
            {!name && <Avatar></Avatar>}
            <Box
                mx={3}
                display='flex'
                flexDirection='column'
                justifyContent='center'
                width={'80%'}
            >
                <Box px={1}>
                    <Name>{name}</Name>
                    {/* {!name && <DeletedName>Deleted</DeletedName>} */}
                </Box>
                <Box px={1}>{props.comment.content}</Box>
                <Box px={1}>
                    <Date>{props.comment.date.toDateString()}</Date>
                </Box>
            </Box>
            {isEditable && (
                <span onClick={handleCommentEdit}>
                    <IconButton size='small'>
                        <FiMoreVertical />
                    </IconButton>
                </span>
            )}
            <Menu
                id='simple-menu'
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCommentEditClose}
            >
                <MenuItem
                    onClick={()=>{handleDelete();handleCommentEditClose();}}
                >
                    Delete
                </MenuItem>
            </Menu>
        </Box>
    );
}

export default Comment;
