import React from "react";
import { reagentAmountChanger } from "../helpers/changeAmountReagent.ts";

export default function changeAmountWindow(curReagent) {
  return (
    <div className="modal_window_wraper">
      <div
        className="overflow"
        onClick={() => {
          document.querySelector(".modal_window_wraper").style.display = "none";
        }}
      />
      <div className="modal_window">
        <p className="reagent_name">{curReagent[0]}</p>
        <p className="reagent_ID">{curReagent[1]}</p>
        <input className="input_volume" />
        <p className="reagent_amount">{curReagent[2]}</p>
        <button
          className="write_off_btn"
          type="button"
          onClick={() => {
            reagentAmountChanger(
              curReagent[4],
              curReagent[3] -
                Number(document.querySelector(".input_volume").value),
            );
            document.querySelector(".modal_window_wraper").style.display =
              "none";
            alert(
              `${curReagent[0]} списано ${document.querySelector(".input_volume").value} ${curReagent[2]}`,
            );
            window.location.href = window.location.href;
          }}
        >
          Списать
        </button>
      </div>
    </div>
  );
}
