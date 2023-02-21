import Highlighter from "react-highlight-words";
import { DescriptiveTooltips } from "../utils/details";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { TooltipProps } from "@mui/material/Tooltip";

export interface annotatedTypographyProps {
  text: string;
  tooltipPlacement?: TooltipProps["placement"];
}

export default function AnnotatedTypography(props: annotatedTypographyProps) {
  return (
    <Highlighter
      searchWords={Object.keys(DescriptiveTooltips)}
      autoEscape={true}
      textToHighlight={props.text}
      highlightTag={({ children, _highlightIndex }) => (
        <Tooltip
          title={DescriptiveTooltips[children]}
          placement={props.tooltipPlacement ? props.tooltipPlacement : "bottom"}
        >
          <Typography
            sx={{ textDecoration: "dotted underline" }}
            display="inline"
            variant="inherit"
          >
            {children}
          </Typography>
        </Tooltip>
      )}
    />
  );
}
