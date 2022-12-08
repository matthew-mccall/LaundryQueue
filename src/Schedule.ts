/**
 * The TimeSlot class represents a time slot. It contains the start time and end time of the time slot. The start time is
 * inclusive, and the end time is exclusive. For example, a time slot with a start time of 12:00 and an end time of 13:00
 * represents the time from 12:00 to 12:59. The time slot is 1 hour long. The start time and end time must be valid Date
 * objects. The start time must be before the end time. A time slot cannot be longer than 24 hours. Time slots can be compared
 * using the less than, greater than, less than or equal to, and greater than or equal to operators. The comparison is based
 * on the start time of the time slots. The equals operator can be used to compare two time slots for equality. Two time
 * slots are equal if they have the same start time and end time. The not equals operator can be used to compare two time
 * slots for inequality. Two time slots are not equal if they have different start times or different end times. Time slots cannot be
 * modified after they are created.
 */
export class TimeSlot {
    start: Date
    end: Date

    /**
     * The constructor for the TimeSlot class.
     * @param start The start time of the time slot.
     * @param end The end time of the time slot.
     * @example
     * const timeSlot = new TimeSlot(new Date(), new Date(new Date().getTime() + 1000 * 60 * 60))
     * console.log(timeSlot.start) // 2021-05-01T00:00:00.000Z
     * console.log(timeSlot.end) // 2021-05-01T01:00:00.000Z
     */
    constructor(start: Date, end: Date) {

        // Check if the start time is valid
        if (isNaN(start.getTime())) {
            throw new Error("The start time is not valid.")
        }

        // Check if the end time is valid
        if (isNaN(end.getTime())) {
            throw new Error("The end time is not valid.")
        }

        // Check if the start time is before the end time
        if (start.getTime() >= end.getTime()) {
            throw new Error("The start time must be before the end time.")
        }

        // Check if the time slot is longer than 24 hours
        if (end.getTime() - start.getTime() > 1000 * 60 * 60 * 24) {
            throw new Error("The time slot cannot be longer than 24 hours.")
        }

        this.start = start
        this.end = end
    }

    /**
     * Checks if the time slot is equal to another time slot. Two time slots are equal if they have the same start time and
     * end time.
     * @param timeSlot The time slot to compare to.
     * @returns True if the time slots are equal, false otherwise.
     */
    equals(timeSlot: TimeSlot): boolean {
        return this.start.getTime() === timeSlot.start.getTime() && this.end.getTime() === timeSlot.end.getTime()
    }

    /**
     * Checks if the time slot is not equal to another time slot. Two time slots are not equal if they have different start
     * times or different end times.
     * @param timeSlot The time slot to compare to.
     * @returns True if the time slots are not equal, false otherwise.
     */
    notEquals(timeSlot: TimeSlot): boolean {
        return this.start.getTime() !== timeSlot.start.getTime() || this.end.getTime() !== timeSlot.end.getTime()
    }

    /**
     * Checks if the time slot is less than another time slot. The comparison is based on the start time of the time slots.
     * @param timeSlot The time slot to compare to.
     * @returns True if the time slot is less than the other time slot, false otherwise.
     */
    lessThan(timeSlot: TimeSlot): boolean {
        return this.start.getTime() < timeSlot.start.getTime()
    }

    /**
     * Checks if the time slot is greater than another time slot. The comparison is based on the start time of the time
     * slots.
     */
    greaterThan(timeSlot: TimeSlot): boolean {
        return this.start.getTime() > timeSlot.start.getTime()
    }

    /**
     * Checks if the time slot is less than or equal to another time slot. The comparison is based on the start time of the
     * time slots.
     * @param timeSlot The time slot to compare to.
     * @returns True if the time slot is less than or equal to the other time slot, false otherwise.
     */
    lessThanOrEqual(timeSlot: TimeSlot): boolean {
        return this.start.getTime() <= timeSlot.start.getTime()
    }

    /**
     * Checks if the time slot is greater than or equal to another time slot. The comparison is based on the start time of
     * the time slots.
     * @param timeSlot The time slot to compare to.
     * @returns True if the time slot is greater than or equal to the other time slot, false otherwise.
     */
    greaterThanOrEqual(timeSlot: TimeSlot): boolean {
        return this.start.getTime() >= timeSlot.start.getTime()
    }

    /**
     * Checks if the time slot contains a date. The start time is inclusive, and the end time is exclusive. For example, a
     * time slot with a start time of 12:00 and an end time of 13:00 represents the time from 12:00 to 12:59. The time slot
     * is 1 hour long.
     * @param date The date to check.
     * @returns True if the time slot contains the date, false otherwise.
     */
    contains(date: Date): boolean {
        return date.getTime() >= this.start.getTime() && date.getTime() < this.end.getTime()
    }

    /**
     * Checks if the time slot overlaps with another time slot.
     * @param timeSlot The time slot to check.
     * @returns True if the time slots overlap, false otherwise.
     */
    overlaps(timeSlot: TimeSlot): boolean {
        return this.start.getTime() < timeSlot.end.getTime() && this.end.getTime() > timeSlot.start.getTime()
    }
}

/**
 * The Schedule class represents a schedule of times when a machine is in use. It contains a list of time slots when the machine
 * is in use. You can add time slots to the schedule, remove time slots from the schedule, and check if a certain time slot is free.
 * Time slots in the schedule cannot overlap. Time slots in the schedule must be in chronological order.
 */
export class Schedule {
    timeSlots: TimeSlot[]
    /**
     * The constructor for the Schedule class.
     */
    constructor() {
        this.timeSlots = []
    }

    /**
     * Adds a time slot to the schedule. The time slot must not overlap with any other time slots in the schedule. If the time slot
     * overlaps with another time slot, or is after the current time, the function returns false. Otherwise, the function returns true.
     */
    addTimeSlot(timeSlot: TimeSlot): boolean {
        // Check if the time slot is in the past
        if (timeSlot.end.getTime() < new Date().getTime()) {
            return false
        }

        // Check if the time slot overlaps with any other time slots
        for (const slot of this.timeSlots) {
            if (timeSlot.start.getTime() < slot.end.getTime() && timeSlot.end.getTime() > slot.start.getTime()) {
                return false
            }
        }

        // Insert the time slot into the schedule
        for (let i = 0; i < this.timeSlots.length; i++) {
            if (timeSlot.lessThan(this.timeSlots[i])) {
                this.timeSlots.splice(i, 0, timeSlot)
                return true
            }
        }

        // Add the time slot to the end of the schedule
        this.timeSlots.push(timeSlot)
        return true
    }

    /**
     * Removes a time slot from the schedule. The time slot must be in the schedule. If the time slot is not in the schedule, the
     * function returns false. Otherwise, the function returns true.
     */
    removeTimeSlot(timeSlot: TimeSlot): boolean {
        const index = this.timeSlots.indexOf(timeSlot)
        if (index === -1) {
            return false
        }
        this.timeSlots.splice(index, 1)
        return true
    }

    /**
     * Checks if a time slot is free. The time slot must not overlap with any other time slots in the schedule. If the time slot
     * overlaps with another time slot, the function returns false. Otherwise, the function returns true.
     */
    isFree(timeSlot: TimeSlot): boolean {
        // Check if the time slot overlaps with any other time slots
        for (const slot of this.timeSlots) {
            if (slot.overlaps(timeSlot)) {
                return false
            }
        }
        return true
    }

    /**
     * Returns the next busy time slot in the schedule. If there is no next time slot, the function returns null.
     * @example
     * const schedule = new Schedule()
     * schedule.addTimeSlot({
     *    start: new Date(),
     *    end: new Date(new Date().getTime() + 1000 * 60 * 60)
     * })
     * schedule.addTimeSlot({
     *    start: new Date(new Date().getTime() + 1000 * 60 * 60 * 2),
     *    end: new Date(new Date().getTime() + 1000 * 60 * 60 * 3)
     * })
     * console.log(schedule.nextBusyTimeSlot()) // { start: Date, end: Date }
     */
    nextBusyTimeSlot(): TimeSlot | null {
        for (const slot of this.timeSlots) {
            if (slot.start.getTime() > new Date().getTime()) {
                return slot
            }
        }
        return null
    }

    /**
     * Returns the next free time slot in the schedule. If there is no next time slot, the function returns null.
     */
    nextFreeTimeSlot(): TimeSlot | null {
        const now = new Date()
        let nextTimeSlot: TimeSlot | null = null
        for (let i = 0; i < this.timeSlots.length; i++) {
            const timeSlot = this.timeSlots[i]
            if (timeSlot.start > now) {
                if (i === 0) {
                    nextTimeSlot = new TimeSlot(now, timeSlot.start)
                } else {
                    nextTimeSlot = new TimeSlot(this.timeSlots[i - 1].end, timeSlot.start)
                }
                break
            }
        }
        return nextTimeSlot
    }


    /**
     * Returns true if the schedule contains a time slot at this time. Otherwise, returns false.
     */
    isBusy(): boolean {
        const now = new Date()
        for (const timeSlot of this.timeSlots) {
            if (timeSlot.contains(now)) {
                return true
            }
        }
        return false
    }
}