import MuiDialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import Avatar from '@material-ui/core/Avatar';
import TextField from "@material-ui/core/TextField";
import Box from '@material-ui/core/Box';
import Button from "@material-ui/core/Button";
import {useEffect, useState} from 'react';
import {FiMoreVertical} from "react-icons/fi";
import IconButton from "@material-ui/core/IconButton";
import styled from "styled-components";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import axios from "axios";

function CommentArea(props){
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState(props.comments);
    const [commenters, setCommenters] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const Date = styled.span`
    font-size: 0.8rem;
    color: grey;
    `;
    const Name= styled.span`
    font-size: 0.9rem;
    font-weight: bolder;
    `;

    const handleCommentEdit = (event) => {
        setAnchorEl(event.currentTarget);
      };
    const handleCommentEditClose = () => {
        setAnchorEl(null)
    }
    const handleCommentChange = (e)=>{
        setComment(e.target.value)
    }
    const handlePost = () =>{
        const newComment = {initial:'N',name:'Nancy',date:'July 4, 2021',content:comment,edit:true,id:'4'}
        setComments(prevComments=>[...prevComments,newComment]);
        setComment('');
    }
    const handleDeleteComment = (e) =>{
        setComments(comments.filter((c)=>c.id!==e.target.id));
        setAnchorEl(null);
    }

    // TODO: used backend endpoints for now, need to be refactored
    useEffect(()=>{
        comments.forEach((c)=>{
            axios.get('/users/info/secure', c.author_id)
                .then(res => {
                    // console.log(res);
                    if (res.status !== 200){
                        console.error(res.data);
                        commenters.push({});
                    } else {
                        let user = res.data;
                        let newCommenters = [...commenters]
                        newCommenters.push({
                            _id: user._id,
                            initial: user.name.charAt(0),
                            name: user.name,
                            content: user.content,
                            date: user.date,
                        });
                        setCommenters(newCommenters);
                    }
                })
                .catch(err => {
                    console.error(err);
                })
        });
    })
return(
    <>
    <Box maxHeight='120px' style={{overflow: 'scroll'}}>
    <MuiDialogContent  dividers>
        <Typography maxHeight='200px'>
            {comments.map((c)=>(
                <Box display='flex' mb={2}>
                    <Avatar>{c.initial}</Avatar>
                    <Box mx={3} display='flex' flexDirection='column' justifyContent='center' width={'80%'}>
                        <Box  px={1}> 
                        <Name>
                        {c.name}
                        </Name>
                        </Box>
                        <Box px={1}>
                        {c.content}
                        </Box>
                        <Box px={1}>
                            <Date>
                            {c.date}
                            </Date>
                        
                        </Box>
                        
                    </Box>
                    {c.edit &&<span onClick={handleCommentEdit}><IconButton  size='small'><FiMoreVertical/></IconButton></span>}
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleCommentEditClose}                      
                    >
                        <MenuItem id={c._id} onClick={handleDeleteComment}>Delete</MenuItem>
                    </Menu>
                </Box>
            ))}
        </Typography>
    </MuiDialogContent>
    </Box>

    <MuiDialogContent  dividers>
    <Typography>
        <Box display='flex'>
            <Avatar>N</Avatar>
            <Box mx={3} width={'70%'}>
            <TextField
     size="small" 
     multiline
         fullWidth
            id="outlined-basic"
            placeholder="write your comment"
            variant="outlined"
            onChange={handleCommentChange}
            value={comment}
          />
            </Box>
            <Button  variant="contained" color="primary" onClick={handlePost}> post</Button>
        </Box>

    </Typography>
    </MuiDialogContent >
    </>
)
}
export default CommentArea