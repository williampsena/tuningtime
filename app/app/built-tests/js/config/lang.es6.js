"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var currentLanguage = navigator.language.replace("-", "");

var Languages = exports.Languages = {
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
        save: "Save"
      },
      interval: {
        default: "Time per cycle (mm)",
        wait: "Time to waiting a new cycle (mm)"
      },
      message: {
        success: "The settings updated with successfully!"
      }
    },
    closeTask: {
      title: "Task Status",
      subTitle: "Did you finish task ?"
    },
    timer: {
      title: "Tasks",
      filter: {
        onlyOpenedTask: "Only task not completed yet",
        placeHolderTask: "Select a task"
      },
      form: {
        taskName: "Task name"
      },
      buttons: {
        addTask: "New task"
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
        taskDeleted: "The task deleted successfully"
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
      started: { title: "Keep your focus", message: "For longer {{min}} minutes!" }
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
        save: "Salvar"
      },
      interval: {
        default: "Tempo para um ciclo (min)",
        wait: "Tempo de espera para um novo ciclo (min)"
      },
      message: {
        success: "Configurações alteradas com sucesso!"
      }
    },
    closeTask: {
      title: "Status da Tarefa",
      subTitle: "Terminou a tarefa ?"
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
      timeOver: { title: "Hora do descanso", message: "Descanse por longos {{min}} minutos!" },
      stopped: { title: "Parou", message: "Seu ciclo foi parado!" },
      started: { title: "Começou", message: "Fique focado por {{min}} minutos!" }
    }
  }
};

var CurrentLanguage = exports.CurrentLanguage = Languages[currentLanguage];