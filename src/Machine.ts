import {Schedule, TimeSlot} from "./Schedule";

/**
 * The MachineStatus enum represents the status of a machine.
 */
export enum MachineStatus {
    BUSY,
    IDLE,
}

/**
 * The Machine class represents a laundry machine. It contains the machine's ID, name. It also contains the
 * machine's schedule, which is a list of time slots when the machine is in use. A machine is idle when the current time
 * is not within a time slot in the schedule. A machine is busy when the current time is within a time slot in the schedule.
 */
export class Machine {
    id: number
    name: string
    schedule: Schedule

    /**
     * The constructor for the Machine class.
     */
    constructor(id: number, name: string) {
        this.id = id
        this.name = name
        this.schedule = new Schedule()
    }

    /**
     * Adds a time slot to the machine's schedule. The time slot must not overlap with any other time slots in the schedule. If the time slot
     * overlaps with another time slot, the function returns false. Otherwise, the function returns true.
     * @returns true if the time slot was added, false otherwise
     * @example
     * const machine = new Machine(1, "Machine 1")
     * machine.schedule.addTimeSlot({
     *   start: new Date(),
     *   end: new Date(new Date().getTime() + 1000 * 60 * 60)
     * })
     * console.log(machine.schedule.timeSlots.length) // 1
     * machine.schedule.addTimeSlot({
     *  start: new Date(new Date().getTime() + 1000 * 60 * 60),
     *  end: new Date(new Date().getTime() + 1000 * 60 * 60 * 2)
     *  })
     */
    addTimeSlot(timeSlot: TimeSlot): boolean {
        return this.schedule.addTimeSlot(timeSlot)
    }

    /**
     * Removes a time slot from the machine's schedule. The time slot must be in the schedule. If the time slot is not in the schedule, the
     * function returns false. Otherwise, the function returns true.
     * @returns true if the time slot was removed, false otherwise
     * @example
     * const machine = new Machine(1, "Machine 1")
     * machine.schedule.addTimeSlot({
     *  start: new Date(),
     *  end: new Date(new Date().getTime() + 1000 * 60 * 60)
     * })
     * machine.schedule.addTimeSlot({
     *  start: new Date(new Date().getTime() + 1000 * 60 * 60),
     *  end: new Date(new Date().getTime() + 1000 * 60 * 60 * 2)
     * })
     * console.log(machine.schedule.timeSlots.length) // 2
     * machine.schedule.removeTimeSlot({
     *  start: new Date(),
     *  end: new Date(new Date().getTime() + 1000 * 60 * 60)
     * })
     * console.log(machine.schedule.timeSlots.length) // 1
     * machine.schedule.removeTimeSlot({
     *  start: new Date(),
     *  end: new Date(new Date().getTime() + 1000 * 60 * 60)
     * })
     * console.log(machine.schedule.timeSlots.length) // 1
     * machine.schedule.removeTimeSlot({
     *  start: new Date(new Date().getTime() + 1000 * 60 * 60),
     *  end: new Date(new Date().getTime() + 1000 * 60 * 60 * 2)
     * })
     * console.log(machine.schedule.timeSlots.length) // 0
     */
    removeTimeSlot(timeSlot: TimeSlot): boolean {
        return this.schedule.removeTimeSlot(timeSlot)
    }

    /**
     * Returns the status of the machine. The machine is busy if the current time is within a time slot in the schedule. The machine is idle
     * if the current time is not within a time slot in the schedule. If the machine is busy, the function returns MachineStatus.BUSY. If the
     * machine is idle, the function returns MachineStatus.IDLE.
     */
    getStatus(): MachineStatus {
        return this.schedule.isBusy() ? MachineStatus.BUSY : MachineStatus.IDLE
    }

    /**
     * Returns the machine's schedule.
     */
    getSchedule(): Schedule {
        return this.schedule
    }

    /**
     * Returns the machine's ID.
     */
    getId(): number {
        return this.id
    }

    /**
     * Returns the machine's name.
     */
    getName(): string {
        return this.name
    }

}