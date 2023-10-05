import React from 'react';
import { GoCheckCircle } from "react-icons/go";
import { GrFormClose } from "react-icons/gr";

type QuizType = {
    choice: string;
    index: number;
    isLoading: boolean;
    isCorrect: boolean;
    isSelected: boolean;
}
const QuizChoice: React.FC<QuizType> = ({ choice, index, isLoading, isCorrect, isSelected }) => {
  return (
    <div className={
        `
        ${isCorrect && isLoading && 'bg-green-300'}
        ${isSelected && !isCorrect && isLoading && 'bg-red-500'}
        ${isSelected && !isLoading && 'bg-[#FDFD96]'}
        rounded-lg
        p-4
        m-4
        shadow-lg
        hover:opacity-50
        flex
        justify-center
        items-center
        `
    }>  
    {isCorrect && isLoading && (
        <div>
            <GoCheckCircle/>
        </div>
    )}

    {!isCorrect && isLoading && isSelected && (
        <div>
            <GrFormClose/>
        </div>
    )}
        <p className="text-neutral-950 font-mono">
            {choice}
        </p>
    </div>
  )
}

export default QuizChoice;
