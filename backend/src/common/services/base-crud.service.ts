import { NotFoundException } from '@nestjs/common';

export abstract class BaseCrudService {
    protected async findOrThrow<T>(
        findFn: () => Promise<T | null>,
            message = 'Resource not found',
        ): Promise<T> {
            const entity = await findFn();

            if (!entity) {
            throw new NotFoundException(message);
            }

        return entity;
    }

    protected async executeFindAll<T>(
        findFn: () => Promise<T[]>,
        ): Promise<T[]> {
        return findFn();
    }

    protected async deleteOrThrow<T>(
        deleteFn: () => Promise<T | null>,
            message = 'Resource not found',
    ): Promise<T> {
        return this.findOrThrow(deleteFn, message);
    }
}