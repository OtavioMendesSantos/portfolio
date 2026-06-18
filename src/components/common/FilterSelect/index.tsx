import { ClearRounded } from "@mui/icons-material";
import {
  Chip,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";

interface FilterSelectProps {
  label: string;
  value: string[];
  options: string[];
  onChange: (event: SelectChangeEvent<string[]>) => void;
  renderOption?: (option: string) => string;
  onDelete: (value: string) => void;
  onClear: () => void;
}

const FilterSelect = ({
  label,
  value,
  options,
  onChange,
  renderOption,
  onDelete,
  onClear,
}: FilterSelectProps) => {
  return (
    <FormControl
      size="small"
      sx={{ minWidth: { xs: "100%", sm: "250px" }, flex: "1" }}
    >
      <InputLabel sx={{ color: "text.secondary", fontWeight: 500 }}>
        {label}
      </InputLabel>
      <Select
        multiple
        value={value}
        onChange={onChange}
        label={label}
        endAdornment={
          value.length > 0 && (
            <InputAdornment position="end" sx={{ mr: 2 }}>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  onClear();
                }}
              >
                <ClearRounded fontSize="small" />
              </IconButton>
            </InputAdornment>
          )
        }
        sx={{
          "& .MuiSelect-iconOutlined": {
            display: value.length > 0 ? "none" : "block",
          },
        }}
        renderValue={(selected: string[]) => (
          <Stack
            direction="row"
            spacing={0.5}
            sx={{ flexWrap: "nowrap", overflow: "hidden" }}
          >
            {selected.map((v) => (
              <Chip
                key={v}
                label={renderOption ? renderOption(v) : v}
                size="small"
                variant="outlined"
                onDelete={() => onDelete(v)}
                onMouseDown={(e) => e.stopPropagation()}
              />
            ))}
          </Stack>
        )}
      >
        {options.map((opt: string) => (
          <MenuItem key={opt} value={opt}>
            {renderOption ? renderOption(opt) : opt}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FilterSelect;
