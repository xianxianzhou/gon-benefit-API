import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Metauri } from './entities/metauri.entity';
import { CreateMetauriDto } from './dto/create-metauri.dto';
import { FindMetauriDto } from './dto/find-metauri.dto';

@Injectable()
export class MetauriService {
	constructor(
		@InjectRepository(Metauri) private metauriRepository: Repository<Metauri>
	) { }

	async create(createMetauriDto: CreateMetauriDto) {

		createMetauriDto.createTime = createMetauriDto.updateTime = new Date();
		return await this.metauriRepository.save(createMetauriDto);
	}
	async createArrayAll(list: Array<CreateMetauriDto>) {


		let result = await this.metauriRepository.save(list)


		return result;
	}
	async findAll() {
		return await this.metauriRepository.find();
	}

	async findBynftID(nftId: string) {
	let sql="select * from metauri where nftId like '%"+nftId+"%' order by id desc"
	let list=await this.metauriRepository.query(sql, []);
	if(list!=null&&list.length>0){
		return list[0]
	}
	console.log(list)
		return null
	}


	async removeMetauri(metauri: Metauri) {

		return await this.metauriRepository.delete(metauri);

	}
	async remove(id: number) {

		return await this.metauriRepository.delete(id);
	}
}
