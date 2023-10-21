import { Autocomplete, Chip, TextField } from '@mui/material';

export const InputTags = ({ variant, data, handleTagChange }) => {
    return (
        <Autocomplete
            multiple
            freeSolo
            options={[]}
            value={data}
            onChange={handleTagChange}
            renderInput={(params) => <TextField {...params} variant={variant}/>}
            renderTags={(value, getTagProps) =>
                value.map((tag, index) => <Chip label={tag} {...getTagProps({ index })} />)
            }
        />
    );
};
