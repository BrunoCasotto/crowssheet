{
	users: {
		user1: {
			name: 'name',
			email: 'email',
			photo: 'photoUrl',
			token: 'token',
			courses: {
				course1: {
					title: 'title',
					description: 'description',
					image: 'url',
					classes: {
						class: {
							title: 'title',
							description: 'description',
							content: 'content writted',
							arquivo: 'url',
							video: 'url',
							test: {
								questions: {
									1:{
										description: "description",
										opcao1: "opcao1",
										opcao2: "opcao2",
										opcao3: "opcao3",
										opcao4: "opcao4",
										correct: "opcao2"
									},
									2:{
										description: "description",
										opcao1: "opcao1",
										opcao2: "opcao2",
										opcao3: "opcao3",
										opcao4: "opcao4",
										correct: "opcao2"
									}
								},
								finalized_tests:10,
								media: 6
							}
						}
					}
				}
			},
			leader: {
				team1
			},
			status: {
				courses_completes: 0,
				tests_completes: 0,
				total_tests: 0,
				total_results: 0,
				avatar {
					avatar1
					achievements: {
						achievement1
					}
				}
			}
		}
	}

	teams: {
		team1: {
			name: 'team name',
			leader: user1,
			users: {
				user1
			},
			courses: {
				course1
			}
		}
	}

	avatars: {
		avatar1 {
			picture: 'url',
			name: 'avatar name'
		}
	}

	achievements: {
		achievement1 {
			picture: 'url',
			name: 'avatar name',
			rule: 'rule' 
		}
	}
}