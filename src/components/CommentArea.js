import MuiDialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import Avatar from '@material-ui/core/Avatar';
import TextField from "@material-ui/core/TextField";
import Box from '@material-ui/core/Box';
import Button from "@material-ui/core/Button";
import {useState} from 'react';
import styled from "styled-components";
import Comment from "./Comment";

function CommentArea(props){
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState(props.comments);
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

    return(
        <>
        <Box maxHeight='120px' style={{overflow: 'scroll'}}>
        <MuiDialogContent  dividers>
            <Typography>
                {comments.map((c)=>(
                    <Comment key={c._id} comment={c} anchorEl={anchorEl}
                             handleCommentEdit={handleCommentEdit} handleDeleteComment={handleDeleteComment}/>
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