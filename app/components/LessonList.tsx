import React from 'react';
import { ChevronRight, PlayCircle, CheckCircle2, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Lesson {
  id: string;
  title: string;
  duration: string;
  isCompleted: boolean;
  isLocked: boolean;
  isActive?: boolean;
}

interface LessonListProps {
  lessons: Lesson[];
  onLessonSelect: (lesson: Lesson) => void;
}

export const LessonList: React.FC<LessonListProps> = ({ lessons, onLessonSelect }) => {
  return (
    <div className="space-y-1">
      {lessons.map((lesson) => (
        <button
          key={lesson.id}
          disabled={lesson.isLocked}
          onClick={() => onLessonSelect(lesson)}
          className={cn(
            "w-full flex items-center justify-between p-3 rounded-lg text-left transition-all group",
            lesson.isActive 
              ? "bg-blue-600/10 border border-blue-500/20 text-blue-400" 
              : "hover:bg-slate-800/50 text-slate-400",
            lesson.isLocked && "opacity-50 cursor-not-allowed"
          )}
        >
          <div className="flex items-center gap-3">
            {lesson.isCompleted ? (
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            ) : lesson.isLocked ? (
              <Lock className="w-5 h-5 text-slate-600" />
            ) : (
              <PlayCircle className={cn(
                "w-5 h-5",
                lesson.isActive ? "text-blue-500" : "text-slate-500 group-hover:text-blue-400"
              )} />
            )}
            <div>
              <p className={cn(
                "text-sm font-medium",
                lesson.isActive ? "text-slate-900" : "group-hover:text-slate-200"
              )}>
                {lesson.title}
              </p>
              <p className={cn(
                "text-xs",
                lesson.isActive ? "text-blue-700/70" : "text-slate-500"
              )}>{lesson.duration}</p>
            </div>
          </div>
          <ChevronRight className={cn(
            "w-4 h-4 transition-transform",
            lesson.isActive ? "rotate-90 text-blue-500" : "text-slate-600 group-hover:translate-x-1"
          )} />
        </button>
      ))}
    </div>
  );
};

export default LessonList;
