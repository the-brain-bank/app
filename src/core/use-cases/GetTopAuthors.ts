import { UserRepository } from '../application/ports/user';
import { User } from '../domain/entities/user';

export class GetTopAuthors {
    constructor(private readonly authorRepository: UserRepository) { }

    async execute(limit: number = 10): Promise<User[]> {
        return this.authorRepository.findAll(limit);
    }
}