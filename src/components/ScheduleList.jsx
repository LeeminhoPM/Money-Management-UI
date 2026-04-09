import React from "react";
import { TransactionInfoCard } from "./TransactionInfoCard";
import CronExpressionParser from "cron-parser";
import moment from "moment";

export const ScheduleList = ({
    schedules,
    onEditSchedule,
    onRemoveSchedule,
}) => {
    return (
        <div className="bg-white shadow-lg rounded-xl border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold">Nguồn Lịch trình</h4>
            </div>

            {/* Danh sách lịch trình */}
            {schedules.length === 0 ? (
                <p className="text-gray-500">
                    Không có lịch trình nào, hay thêm lịch trình mới để bắt đầu!
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">
                    {schedules.map((schedule) => (
                        <TransactionInfoCard
                            key={schedule.id}
                            title={schedule.name}
                            icon={schedule.icon}
                            cronExpression={moment(
                                CronExpressionParser.parse(
                                    schedule.cronExpression,
                                )
                                    .next()
                                    .toString(),
                            ).format("HH:mm DD/MM/YYYY")}
                            amount={schedule.amount}
                            type={schedule.type}
                            categoryName={schedule.categoryName}
                            onDelete={() => onRemoveSchedule(schedule.id)}
                            onUpdate={() => onEditSchedule(schedule)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
