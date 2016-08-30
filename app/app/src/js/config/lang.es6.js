let currentLanguage = navigator.language.replace("-", "");

export var Languages = {
  enUS: {
    index: {
      title: "Let's go",
      emptyTaskStatus: "You should start some task",
      buttons: {
        start: "Start",
        status: "Status"
      },
      chart: {
        titleX: "Day",
        titleY: "Min"
      }
    },
    setting: {
      title: "Settings",
      buttons: {
        save: "Save",
        clearDatabase: "Clear database"
      },
      interval: {
        default: "Time per cycle",
        wait: "Time to waiting a new cycle"
      },
      message: {
        success: "The settings updated with successfully!",
        clearDatabase: "The database was cleaned!",
        clearDatabaseConfirm: "Are you sure to clean database?"
      }
    },
    closeTask: {
      title: "Did you finish task ?"
    },
    timer: {
      title: "Tasks",
      filter: {
        onlyOpenedTask: "Not completed",
        placeHolderTask: "Select a task"
      },
      form: {
        taskName: "Task name"
      },
      buttons: {
        addTask: "New task"
      },
      taskList: {
        columns: {
          name: {
            label: "Name"
          }
        }
      }
    },
    taskManagement: {
      title: "Task",
      filter: {
        onlyOpenedTask: "Only task not completed yet",
        placeHolderTask: "Select a task"
      },
      form: {
        taskName: "Name"
      },
      messages: {
        taskUpdated: "The task updated successfully",
        taskDeleted: "The task deleted successfully",
        confirmTaskDelete: "Do you want to remove the task {task}?"
      }
    },
    exportFile: {
      title: "Export"
    },
    buttons: {
      yes: "Yes",
      no: "No",
      cancel: "Cancel",
      save: "Save"
    },
    alert: {
      timeOver: { title: "Take a break", message: "For {{min}} minutes!" },
      stopped: { title: "Interruption", message: "You stopped your cycle!" },
      started: { title: "Keep your focus", message: "For longer {{min}} minutes!" },
      continueTask: {
        title: "There is a started task, Do you would continue this task or cancel?"
      }
    },
    about: {
      title: 'About',
      message: 'Great thanks to download and use this app, if you would like to contribute, report an issue or upgrade project, please access our repository on GitHub!',
      poweredby: 'Coisa de Programador',
      site: 'http://www.coisadeprogramador.com.br'
    },
    grid: {
      empty: 'Oops! No data could be found'
    }
  },
  ptBR: {
    index: {
      title: "Vamos começar ?",
      emptyTaskStatus: "Nenhuma atividade encontrada",
      buttons: {
        start: "Iniciar",
        status: "Status"
      },
      chart: {
        titleX: "Dia",
        titleY: "Minutos"
      }

    },
    setting: {
      title: "Configurações",
      buttons: {
        save: "Salvar",
        clearDatabase: "Apagar dados"
      },
      interval: {
        default: "Tempo para um ciclo",
        wait: "Tempo de espera para um novo ciclo"
      },
      message: {
        success: "Configurações alteradas com sucesso!",
        clearDatabase: "Dados apagados!",
        clearDatabaseConfirm: "Deseja limpar o banco de dados?"
      }
    },
    closeTask: {
      title: "Terminou a tarefa ?",
    },
    timer: {
      title: "Atividades",
      filter: {
        onlyOpenedTask: "Somente atividades não finalizadas",
        placeHolderTask: "Selecione uma atividade"
      },
      form: {
        taskName: "Nome da tarefa"
      },
      buttons: {
        addTask: "Nova tarefa"
      },
      taskList: {
        columns: {
          name: {
            label: "Nome"
          }
        }
      }
    },
    taskManagement: {
      title: "Tarefas",
      filter: {
        placeHolderTask: "Selecione uma atividade",
        onlyOpenedTask: "Somente atividades não finalizadas"
      },
      form: {
        taskName: "Nome"
      },
      messages: {
        taskUpdated: "A tarefa foi atualizada",
        taskDeleted: "A tarefa foi deletada"
      }
    },
    exportFile: {
      title: "Exportar"
    },
    buttons: {
      yes: "Sim",
      no: "No",
      cancel: "Cancelar",
      save: "Salvar"
    },
    alert: {
      timeOver: { title: "Hora do descanso", message: `Descanse por longos {{min}} minutos!` },
      stopped: { title: "Parou", message: "Seu ciclo foi parado!" },
      started: { title: "Começou", message: "Fique focado por {{min}} minutos!" }
    },
    about: {
      title: 'Sobre',
      message: 'Muito obrigado por baixar e utilizar este aplicativo, se você deseja contribuir, reportar problemas, sugerir melhorias, por favor acesse nosso repositório no GitHub!',
      poweredby: 'Coisa de Programador',
      site: 'http://www.coisadeprogramador.com.br'
    },
    grid: {
      empty: 'Oops! Nenhum resultado encontrado.'
    }
  }
};

export var CurrentLanguage = Languages[currentLanguage];