import Highlighter from "react-highlight-words";
import { DescriptiveTooltips } from "../utils/details";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { TooltipProps } from "@mui/material/Tooltip";
import Grow from "@mui/material/Grow";

export interface annotatedTypographyProps {
  text: string;
  tooltipPlacement?: TooltipProps["placement"];
  dict?: { [key: string]: string }[];
}

export default function AnnotatedTypography(props: annotatedTypographyProps) {
  return (
    <Highlighter
      searchWords={
        props.dict ? Object.keys(props.dict) : Object.keys(DescriptiveTooltips)
      }
      autoEscape={true}
      caseSensitive={false}
      textToHighlight={props.text}
      highlightTag={({ children, _highlightIndex }) => (
        <Tooltip
          title={
            props.dict ? props.dict[children] : DescriptiveTooltips[children]
          }
          placement={props.tooltipPlacement ? props.tooltipPlacement : "bottom"}
          TransitionComponent={Grow}
          arrow
          describeChild
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
