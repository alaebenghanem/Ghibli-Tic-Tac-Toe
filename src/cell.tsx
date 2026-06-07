import { Dispatch, SetStateAction } from "react";
import calciferImg from "./assets/calcifer.png";
import jijiImg from "./assets/jiji.png";

type CellProps = {
    id: number;
    go: string;
    setGo: Dispatch<SetStateAction<string>>;
    cells: string[];
    setCells: Dispatch<SetStateAction<string[]>>;
    winningMessage: string;
};

function Cell({ id, go, setGo, cells, setCells, winningMessage }: CellProps) {
    const cellValue = cells[id];

    const handleClick = () => {
        if (winningMessage) {
            return;
        }
        const notTaken = !cells[id];
        if (notTaken) {
            if (go === "calcifer") {
                handleChange("calcifer");
                setGo("jiji");
            } else if (go === "jiji") {
                handleChange("jiji");
                setGo("calcifer");
            }
        }
    };

    const handleChange = (cellToChange: string) => {
        const copyCells = [...cells];
        copyCells[id] = cellToChange;
        setCells(copyCells);
    };

    const renderCellContent = () => {
        if (!cellValue) return null;

        if (cellValue === "calcifer") {
            return (
                <img
                    src={calciferImg}
                    alt="Calcifer"
                    className="cell-img calcifer-img"
                    draggable={false}
                />
            );
        }
        if (cellValue === "jiji") {
            return (
                <img
                    src={jijiImg}
                    alt="Jiji"
                    className="cell-img jiji-img"
                    draggable={false}
                />
            );
        }
        return null;
    };

    return (
        <div className={`square ${cellValue ? "taken" : "empty"}`} onClick={handleClick}>
            <div className={`cell-content ${cellValue || ""}`}>
                {renderCellContent()}
            </div>
        </div>
    );
}

export default Cell;