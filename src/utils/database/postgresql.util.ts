// Dependencies
import { Sequelize } from 'sequelize'
// Modules
import meditation from '#meditation'
import { Databases } from '#src/types/enums/general.enum'

const { postgres: postgresConfig } = meditation.config.database
const { active_databases } = meditation.config

export const postgres = new Sequelize(postgresConfig.database, postgresConfig.user, postgresConfig.password, {
	dialect: 'postgres',
	host: postgresConfig.host,
	sync: postgresConfig.sync,
	logging: false,
})

if (active_databases.includes(Databases.POSTGRES))
	try {
		await postgres.authenticate()
		console.log('postgres is connected.')
	} catch (error) {
		console.error('error on postgres connection.')
	}
