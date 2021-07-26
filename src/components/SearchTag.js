import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
function SearchTag({ content, count, clearSearch }) {
    const Result = styled.span`
        margin-left: 10%;
        color: #50a9c1;
    `;
    const Tag = styled.span`
        padding: 3px 8px;
        border: 1px solid #50a9c1;
        border-radius: 5px;
        color: #50a9c1;
        align-items: center;
        color: #50a9c1;
        display: inline-flex;
        fill: #50a9c1;
        &:hover {
        }
    `;

    return (
        <Box mb={2}>
            <Result>{`${count} results containing :`}</Result>
            <Tag>
                {content}
                <IconButton
                    size='small'
                    aria-label='close'
                    onClick={clearSearch}
                >
                    <CloseIcon />
                </IconButton>
            </Tag>
        </Box>
    );
}
export default SearchTag;
