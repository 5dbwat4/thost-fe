import diffsmap from "../basicinfo/diffs.json";
import flatten from "../../../shared/lib/@mskashef/flatten-tree";

export const Diffsmap_flattened = ((ro) => {
let re = {};
ro.forEach(v => { if (v.value != 0) re[v.value] = v.label; });
return re;
})(flatten(diffsmap));
